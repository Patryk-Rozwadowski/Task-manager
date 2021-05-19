"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
let UserRepository = UserRepository_1 = class UserRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger("UserRepository");
    }
    async signUp(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const newUser = new user_entity_1.default();
        newUser.username = username;
        newUser.salt = await bcrypt.genSalt();
        newUser.password = await UserRepository_1._hashPassword(password, newUser.salt);
        try {
            await newUser.save();
            this.logger.log(`New user created ${username}`);
        }
        catch ({ code }) {
            const userAlreadyExistsWithUsername = code === "23505";
            if (userAlreadyExistsWithUsername) {
                this.logger.warn(`Username ${username} already exists.`);
                throw new common_1.ConflictException(`Username error.`);
            }
            else
                throw new common_1.InternalServerErrorException();
        }
    }
    async validatePassword(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });
        if (user && (await user.validatePassword(password))) {
            return true;
        }
    }
    static async _hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
};
UserRepository = UserRepository_1 = __decorate([
    typeorm_1.EntityRepository(user_entity_1.default)
], UserRepository);
exports.default = UserRepository;
//# sourceMappingURL=user.repository.js.map