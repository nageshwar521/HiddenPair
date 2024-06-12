import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import SoundSettings from '@modules/Settings/SoundSettings';
import GameModeSettings from '@modules/Settings/GameModeSettings';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@navigation/MainStackNavigator';
import { clearSelectedUser, selectAppData } from '@store/slices/appSlice';
import CustomButton from '@components/CustomButton';
import { AppDispatch } from '@store/index';

type SettingsScreenProp = StackNavigationProp<RootStackParamList, 'Settings'>;

interface Props {
  navigation: SettingsScreenProp;
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedUser } = useSelector(selectAppData);
  const dispatch = useDispatch<AppDispatch>();
  const [currentView, setCurrentView] = useState<'menu' | 'sound' | 'profile' | 'gameMode'>('menu');

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => dispatch(clearSelectedUser()) },
    ]);
  };

  const renderMenu = () => (
    <View style={styles.menuContainer}>
      {selectedUser ? (
        <>
          <CustomButton title="Edit Sound" onPress={() => setCurrentView('sound')} buttonStyle={styles.button} />
          <CustomButton title="Change User" onPress={() => navigation.navigate('UserSelection')} buttonStyle={styles.button} />
          <CustomButton title="Game Mode" onPress={() => setCurrentView('gameMode')} buttonStyle={styles.button} />
          <CustomButton title="Logout" onPress={handleLogout} buttonStyle={styles.button} />
        </>
      ) : (
        <CustomButton title="Select User" onPress={() => navigation.navigate('UserSelection')} buttonStyle={styles.button} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        {selectedUser && selectedUser.photo ? (
          <Image source={{ uri: selectedUser.photo }} style={styles.userImage} />
        ) : (
          <Icon name="person" type="material" size={100} />
        )}
        <Text style={styles.userName}>{selectedUser ? selectedUser.name : 'No user selected'}</Text>
      </View>
      {currentView === 'menu' && renderMenu()}
      {currentView === 'sound' && <SoundSettings />}
      {currentView === 'gameMode' && <GameModeSettings />}
      {currentView !== 'menu' && <CustomButton title="Back to Menu" onPress={() => setCurrentView('menu')} buttonStyle={styles.button} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
  },
});

export default SettingsScreen;