import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, Switch } from 'react-native-elements';
import { setSoundEnabled, selectSettings } from '@store/slices/settingsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '@store/index';

const SoundSettings = () => {
  const { soundEnabled } = useSelector(selectSettings);
  const dispatch = useDispatch<AppDispatch>();
  const [isSoundEnabled, setIsSoundEnabled] = useState(soundEnabled);

  useEffect(() => {
    const loadStoredSettings = async () => {
      const storedSoundEnabled = await AsyncStorage.getItem('soundEnabled');
      if (storedSoundEnabled !== null) {
        const parsedSoundEnabled = JSON.parse(storedSoundEnabled);
        setIsSoundEnabled(parsedSoundEnabled);
        dispatch(setSoundEnabled(parsedSoundEnabled));
      }
    };
    loadStoredSettings();
  }, [dispatch]);

  const toggleSound = async () => {
    const newSoundEnabled = !isSoundEnabled;
    setIsSoundEnabled(newSoundEnabled);
    dispatch(setSoundEnabled(newSoundEnabled));
    await AsyncStorage.setItem('soundEnabled', JSON.stringify(newSoundEnabled));
  };

  return (
    <View style={styles.container}>
      <ListItem containerStyle={styles.listItem} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Enable Sound</ListItem.Title>
        </ListItem.Content>
        <Switch value={isSoundEnabled} onValueChange={toggleSound} />
      </ListItem>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  listItem: {
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default SoundSettings;