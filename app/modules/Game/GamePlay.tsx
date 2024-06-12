import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, BackHandler, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addGameHistory, saveGameHistory, selectGame } from '@store/slices/gameSlice';
import CardList from './CardList';
import useGameLogic from '../../hooks/useGameLogic';
import CustomAlert from '@components/CustomAlert';
import { AppDispatch } from '@store/index';
import { selectSelectedUser } from '@store/slices/appSlice';

interface GamePlayProps {
  width: number;
  height: number;
  onCardFlip: () => void;
  onRestart: () => void;
  onGoHome: () => void;
  mode: 'easy' | 'medium' | 'hard'; // Mode is lowercase
}

const GamePlay: React.FC<GamePlayProps> = ({ width, height, onCardFlip, onRestart, onGoHome, mode }) => {
  const { stepCount } = useSelector(selectGame);
  const selectedUser = useSelector(selectSelectedUser);
  const dispatch = useDispatch<AppDispatch>();
  const [showSaveStatus, setShowSaveStatus] = useState(false);

  // Determine rows and cols based on the mode
  const getGridSize = (mode: 'easy' | 'medium' | 'hard') => {
    switch (mode) {
      case 'easy':
        return { rows: 4, cols: 3 };
      case 'medium':
        return { rows: 5, cols: 4 };
      case 'hard':
        return { rows: 6, cols: 5 };
      default:
        return { rows: 6, cols: 5 };
    }
  };

  const { rows, cols } = getGridSize(mode);
  const cardWidth = (width / cols) * 0.8;
  const cardHeight = height / rows;

  const { randomNumbers, flippedCards, handleCardPress, resetGame, isGameOver } = useGameLogic(rows, cols, onCardFlip, onRestart, onGoHome);

  const saveHistory = useCallback(() => {
    if (selectedUser) {
      const gameHistory = {
        userId: selectedUser.id,
        username: selectedUser.username,
        score: stepCount,
        date: new Date().toISOString(),
      };
      dispatch(addGameHistory(gameHistory));
      dispatch(saveGameHistory());
    }
  }, [dispatch, selectedUser, stepCount]);

  const handleConfirmSave = useCallback(() => {
    setShowSaveStatus(true);
    saveHistory();
  }, [saveHistory]);

  const handleNewGame = useCallback(() => {
    setShowSaveStatus(false);
    resetGame();
  }, [resetGame]);

  const handleGoHome = useCallback(() => {
    setShowSaveStatus(false);
    onGoHome();
  }, [onGoHome]);

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
  //     Alert.alert(
  //       'Exit Game',
  //       'Do you want to save the game before exiting?',
  //       [
  //         {
  //           text: 'Cancel',
  //           style: 'cancel',
  //           onPress: () => null,
  //         },
  //         {
  //           text: 'Save',
  //           onPress: () => {
  //             handleConfirmSave();
  //             handleGoHome();
  //           },
  //         },
  //         {
  //           text: 'Exit without saving',
  //           onPress: handleGoHome,
  //           style: 'destructive',
  //         },
  //       ],
  //       { cancelable: true }
  //     );
  //     return true;
  //   });

  //   return () => backHandler.remove();
  // }, [handleConfirmSave, handleGoHome]);

  useEffect(() => {
    if (isGameOver) {
      handleConfirmSave();
    }
  }, [isGameOver, handleConfirmSave]);

  return (
    <View style={styles.container}>
      <CardList
        rows={rows}
        cols={cols}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        randomNumbers={randomNumbers}
        flippedCards={flippedCards}
        onCardPress={handleCardPress}
      />
      <CustomAlert
        visible={showSaveStatus}
        title="Game Saved"
        message={`Game saved successfully with ${stepCount} steps. Do you want to start a new game or go home?`}
        onConfirm={handleNewGame}
        onCancel={handleGoHome}
        confirmText="New Game"
        cancelText="Go Home"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
});

export default GamePlay;