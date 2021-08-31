import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

const selectTasks = (state: RootState) => state.tasks;
const tasksSelector = createSelector(selectTasks, (state) => state);

export { selectTasks, tasksSelector };
