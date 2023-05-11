import { configureStore } from "@reduxjs/toolkit";
import playgroundSlice from "./features/playground/playgroundSlice";
// ...

export const store = configureStore({
  reducer: {
    playground: playgroundSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
