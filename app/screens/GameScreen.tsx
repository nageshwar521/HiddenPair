import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, BackHandler, Alert } from 'react-native';
import GamePlay from '../modules/Game/GamePlay';
import Toolbar from '@modules/Game/Toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { incrementStepCount, resetStepCount, selectGame } from '@store/slices/gameSlice';
import { selectAppData } from '@store/slices/appSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@navigation/MainStackNavigator';
import { selectSettings } from '@store/slices/settingsSlice';

const { width, height } = Dimensions.get('window');

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;

type Props = {
  navigation: GameScreenNavigationProp;
};

const GameScreen: React.FC<Props> = ({ navigation }) => {
  const { stepCount } = useSelector(selectGame);
  const { selectedUser } = useSelector(selectAppData);
  const { gameMode } = useSelector(selectSettings);
  const dispatch = useDispatch();

  const handleCardFlip = useCallback(() => {
    dispatch(incrementStepCount());
  }, [dispatch]);

  const handleRestart = useCallback(() => {
    dispatch(resetStepCount());
  }, [dispatch]);

  const handleGoHome = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const handleBackPress = useCallback(() => {
    Alert.alert('Hold on!', 'Do you want to save the game before exiting?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Exit without Saving',
        onPress: handleGoHome,
        style: 'destructive',
      },
    ]);
    return true;
  }, [handleGoHome]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, [handleBackPress]);

  return (
    <SafeAreaView style={styles.container}>
      <Toolbar onBackPress={handleBackPress} selectedUserName={selectedUser?.name ?? 'No name'} stepCount={stepCount} />
      <GamePlay
        width={width}
        height={height * 0.7}
        onCardFlip={handleCardFlip}
        onRestart={handleRestart}
        onGoHome={handleGoHome}
        mode={gameMode} // Pass the game mode to GamePlay
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default GameScreen;