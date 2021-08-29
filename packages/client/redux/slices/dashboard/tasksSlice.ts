import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TasksState = {
	data: string;
};

const initialState: TasksState = {
	data: "",
};

const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		fetchTasks: (state) => {
			state.data = "task";
		},
	},
});

export type { TasksState };
export const { fetchTasks } = tasksSlice.actions;
export const getTasks = (state: RootState) => state.tasks.data;
export { tasksSlice };
export default tasksSlice.reducer;
