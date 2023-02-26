import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { UserReducer } from "./slices/user";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

export function makeStore() {
	return configureStore({
		reducer: {
			user: UserReducer,
		},
	});
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export const wrapper = createWrapper<RootStore>(makeStore, { debug: true });

export type AppDispatch = typeof store.dispatch;
