import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type DashboardState = {
	tasks: string;
};

const initialState: DashboardState = {
	tasks: "",
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
		fetchTasks: (state) => {
			state.tasks = "task";
		},
	},
});

export type { DashboardState };
export const { fetchTasks } = dashboardSlice.actions;
export const getTasks = (state: RootState) => state.dashboard.tasks;
export { dashboardSlice };
export default dashboardSlice.reducer;
