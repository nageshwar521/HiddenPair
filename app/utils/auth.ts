// utils/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'userToken';
const EXPIRY_KEY = 'userTokenExpiry';

export const setSession = async (token: string, expiry: number) => {
  try {
    await AsyncStorage.multiSet([
      [TOKEN_KEY, token],
      [EXPIRY_KEY, expiry.toString()],
    ]);
  } catch (error) {
    console.error('Error setting session:', error);
  }
};

export const clearSession = async () => {
  try {
    await AsyncStorage.multiRemove([TOKEN_KEY, EXPIRY_KEY]);
  } catch (error) {
    console.error('Error clearing session:', error);
  }
};

export const getSession = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    const expiry = await AsyncStorage.getItem(EXPIRY_KEY);
    if (token && expiry) {
      const expiryDate = parseInt(expiry, 10);
      return { token, expiry: expiryDate };
    }
    return null;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

export const isSessionExpired = (expiry: number) => {
  const currentTimestamp = Date.now();
  return currentTimestamp > expiry;
};