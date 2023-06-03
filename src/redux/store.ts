import { configureStore } from '@reduxjs/toolkit'
import playgroundSlice from "./playgroundSlice";
import workspaceSlice from './workspaceSlice';
// ...

export const store = configureStore({
  reducer: {
    playground: playgroundSlice,
    workspace: workspaceSlice
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch