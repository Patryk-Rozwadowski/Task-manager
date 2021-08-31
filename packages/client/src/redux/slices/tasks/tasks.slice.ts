import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TasksState = {
	data: Array<any>;
	pending: boolean;
	error: boolean;
};

const initialState: TasksState = {
	data: [],
	pending: false,
	error: false,
};

const getAllTasks = createAsyncThunk("tasks", async () => {
	const response = await axios.get("http://localhost:3001/tasks");
	return response.data;
});

const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllTasks.pending, (state) => {
				state.pending = true;
			})
			.addCase(getAllTasks.fulfilled, (state, { payload }) => {
				state.pending = false;
				state.data = payload;
			})
			.addCase(getAllTasks.rejected, (state) => {
				state.pending = false;
				state.error = true;
			});
	},
});

export type { TasksState };
export const getTasks = (state: RootState) => state.tasks.data;
export { tasksSlice, getAllTasks };
export default tasksSlice.reducer;
