import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '@store/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from './appSlice';

interface GameHistory {
  userId: string;
  username: string;
  score: number;
  date: string;
}

interface GameState {
  selectedUser: User | null;
  stepCount: number;
  gameHistory: GameHistory[];
}

const initialState: GameState = {
  selectedUser: null,
  stepCount: 0,
  gameHistory: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload;
    },
    incrementStepCount(state) {
      state.stepCount += 1;
    },
    resetStepCount(state) {
      state.stepCount = 0;
    },
    addGameHistory(state, action: PayloadAction<GameHistory>) {
      state.gameHistory.push(action.payload);
    },
    setGameHistory(state, action: PayloadAction<GameHistory[]>) {
      state.gameHistory = action.payload;
    },
    clearGameHistory(state) {
      state.gameHistory = [];
    },
    resetGame(state) {
      state.stepCount = 0;
      state.selectedUser = null;
      state.gameHistory = [];
    }
  },
});

export const {
  setSelectedUser,
  incrementStepCount,
  resetStepCount,
  addGameHistory,
  setGameHistory,
  clearGameHistory,
  resetGame
} = gameSlice.actions;

export const saveGameHistory = (): AppThunk => async (dispatch, getState) => {
  const { gameHistory } = getState().game;
  await AsyncStorage.setItem('gameHistory', JSON.stringify(gameHistory));
};

export const loadGameHistory = (): AppThunk => async (dispatch) => {
  const gameHistory = await AsyncStorage.getItem('gameHistory');
  if (gameHistory) {
    dispatch(setGameHistory(JSON.parse(gameHistory)));
  }
};

export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;