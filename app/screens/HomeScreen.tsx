import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/MainStackNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { loadGameHistory, resetGame } from '@store/slices/gameSlice';
import { AppDispatch } from '@store/index';
import { selectAppData } from '@store/slices/appSlice';
import { debounce } from 'lodash'; // Assuming lodash is available
import CustomButton from '@components/CustomButton';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedUser } = useSelector(selectAppData);

  useEffect(() => {
    dispatch(loadGameHistory());
  }, [dispatch]);

  const handleStartGame = debounce(() => {
    dispatch(resetGame());
    if (selectedUser) {
      navigation.navigate('Game');
    } else {
      navigation.navigate('UserSelection');
    }
  }, 500); // Adjust debounce delay as needed

  return (
    <View style={styles.container}>
      <Text h1 style={styles.title}>HiddenPair</Text>
      <View style={styles.menu}>
        <CustomButton
          title={selectedUser ? "Start Game" : "Select User"}
          onPress={handleStartGame}
          buttonStyle={styles.button}
        />
        <CustomButton
          title="Leaderboard"
          onPress={() => navigation.navigate('Leaderboard')}
          buttonStyle={styles.button}
        />
        <CustomButton
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 50,
  },
  menu: {
    width: '80%',
  },
  button: {
    marginVertical: 10,
  },
});

export default HomeScreen;