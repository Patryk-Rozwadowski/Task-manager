import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import dashboardReducer from "./dashboard/dashboardSlice";

const store = configureStore({
	reducer: {
		counter: counterReducer,
		dashboard: dashboardReducer,
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
