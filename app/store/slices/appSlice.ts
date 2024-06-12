import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  username: string;
  photo?: string;
}

interface BrokenReport {
  error: string;
  deviceInfo: string;
}

interface AppState {
  selectedUser: User | null;
  users: User[];
  brokenReports: BrokenReport[];
}

const initialState: AppState = {
  selectedUser: null,
  users: [],
  brokenReports: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    editUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    deleteMultipleUsers(state, action: PayloadAction<string[]>) {
      state.users = state.users.filter(user => !action.payload.includes(user.id));
    },
    deleteAllUsers(state) {
      state.users = [];
    },
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
    addBrokenReport(state, action: PayloadAction<BrokenReport>) {
      state.brokenReports.push(action.payload);
      // Save broken reports to AsyncStorage
      AsyncStorage.setItem('brokenReports', JSON.stringify(state.brokenReports));
    },
  },
});

export const {
  setSelectedUser,
  addUser,
  editUser,
  deleteUser,
  deleteMultipleUsers,
  deleteAllUsers,
  clearSelectedUser,
  addBrokenReport,
} = appSlice.actions;

export const selectAppData = (state: RootState) => state.app;
export const selectSelectedUser = (state: RootState) => state.app.selectedUser;

export default appSlice.reducer;