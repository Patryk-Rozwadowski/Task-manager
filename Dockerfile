FROM node:14
WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./

COPY /packages/client/package.json ./packages/client
COPY /packages/server/package.json ./packages/server

COPY /packages /packages

EXPOSE 3000
