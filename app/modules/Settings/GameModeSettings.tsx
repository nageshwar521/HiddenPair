import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, Icon } from 'react-native-elements';
import { setGameMode, selectSettings, loadSettings } from '@store/slices/settingsSlice';
import { AppDispatch } from '@store/index';

interface GameMode {
  id: 'easy' | 'medium' | 'hard';
  displayName: string;
}

const gameModes: GameMode[] = [
  { id: 'easy', displayName: 'Easy' },
  { id: 'medium', displayName: 'Medium' },
  { id: 'hard', displayName: 'Hard' },
];

const GameModeSettings: React.FC = () => {
  const { gameMode } = useSelector(selectSettings);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedMode, setSelectedMode] = useState<'easy' | 'medium' | 'hard'>(gameMode);

  useEffect(() => {
    dispatch(loadSettings());
  }, [dispatch]);

  useEffect(() => {
    setSelectedMode(gameMode);
  }, [gameMode]);

  const handleSelect = (mode: GameMode) => {
    setSelectedMode(mode.id);
    dispatch(setGameMode(mode.id));
  };

  return (
    <View style={styles.container}>
      {gameModes.map((mode) => (
        <ListItem key={mode.id} bottomDivider containerStyle={styles.listItem} onPress={() => handleSelect(mode)}>
          <ListItem.Content>
            <ListItem.Title>{mode.displayName}</ListItem.Title>
          </ListItem.Content>
          {selectedMode === mode.id && (
            <Icon name="check" type="material" color="green" />
          )}
        </ListItem>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  listItem: {
    width: '100%',
  },
});

export default GameModeSettings;