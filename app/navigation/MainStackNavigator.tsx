import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/HomeScreen';
import GameScreen from '@screens/GameScreen';
import SettingsScreen from '@screens/SettingsScreen';
import AboutScreen from '@screens/AboutScreen';
import LeaderboardScreen from '@screens/LeaderboardScreen';
import UserSelectionScreen from '@screens/UserSelectionScreen';
import LoadingScreen from '@screens/LoadingScreen'; // Assume you have a LoadingScreen component

export type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Settings: undefined;
  About: undefined;
  Leaderboard: undefined;
  UserSelection: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

  // Simulate loading delay
  setTimeout(() => {
    setIsLoading(false);
  }, 2000); // Set to true initially, simulate loading delay for 2 seconds

  if (isLoading) {
    return <LoadingScreen />; // Show loading screen while isLoading is true
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // Hide header on Home screen
        />
        <Stack.Screen name="UserSelection" component={UserSelectionScreen} />
        <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;