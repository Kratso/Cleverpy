import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import postsReducer from '../features/post-feed/postsSlice';
import usersReducer from '../features/post-feed/usersSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
