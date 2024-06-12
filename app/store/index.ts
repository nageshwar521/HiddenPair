// src/store/index.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from '@store/slices/appSlice';
import settingsReducer from '@store/slices/settingsSlice';
import gameSlice from './slices/gameSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    game: gameSlice,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;