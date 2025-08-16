import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boardSlice";

export const store = configureStore({
	// The `reducer` field can be a single reducer or an object
	// of slice reducers.
	reducer: {
		board: boardReducer,
		// You could add other slices here later:
		// user: userReducer,
		// theme: themeReduce
	},
});

// These types are essential for using Redux with TypeScript.
// They allow you to have type-safe access to your state and dispatch function.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
