import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter/counterSlice";
import tasksReducer from "./slices/dashboard/tasksSlice";

const store = configureStore({
	reducer: {
		counter: counterReducer,
		tasks: tasksReducer,
	},
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export type { AppDispatch, RootState, AppThunk };
export { store };
