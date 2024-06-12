// src/slices/settingsSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '..';

interface SettingsState {
  soundEnabled: boolean;
}

const initialState: SettingsState = {
  soundEnabled: true,
};

// Define an async thunk to handle loading settings from storage
const loadSettings = createAsyncThunk(
  'settings/loadSettings',
  async () => {
    try {
      const soundEnabled = await AsyncStorage.getItem('soundEnabled');
      const parsedSoundEnabled = soundEnabled ? JSON.parse(soundEnabled) : initialState.soundEnabled;
      return { soundEnabled: parsedSoundEnabled };
    } catch (error) {
      console.error('Error loading settings:', error);
      throw error; // Throw error to be handled by the caller
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSoundEnabled(state, action: PayloadAction<boolean>) {
      state.soundEnabled = action.payload;
      AsyncStorage.setItem('soundEnabled', JSON.stringify(state.soundEnabled));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSettings.fulfilled, (state, action) => {
      state.soundEnabled = action.payload.soundEnabled;
    });
  },
});

export const { setSoundEnabled } = settingsSlice.actions;

// Selector to access the settings state
export const selectSettings = (state: RootState) => state.settings;

// Export the reducer and the async thunk
export { loadSettings };
export default settingsSlice.reducer;