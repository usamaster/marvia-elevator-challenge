import { configureStore } from "@reduxjs/toolkit";
import elevatorReducer from "../features/elevator/elevatorSlice";

export const store = configureStore({
  reducer: {
    elevator: elevatorReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
