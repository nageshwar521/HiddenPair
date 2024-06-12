// src/screens/LeaderboardScreen.tsx
import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearGameHistory, loadGameHistory, selectGame } from '@store/slices/gameSlice';
import { Button, Icon } from 'react-native-elements';
import { AppDispatch } from '@store/index';
import CustomButton from '@components/CustomButton';

const LeaderboardScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { gameHistory } = useSelector(selectGame);

  useEffect(() => {
    dispatch(loadGameHistory());
  }, [dispatch]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <View style={styles.userInfo}>
        <Icon name="person" type="material" size={40} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.username}</Text>
          <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
        </View>
      </View>
      <Text style={styles.score}>Score: {item.score}</Text>
    </View>
  );

  const handleClearHistory = () => {
    Alert.alert('Clear History', 'Are you sure you want to clear the game history?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', onPress: () => dispatch(clearGameHistory()) },
    ]);
  };

  return (
    <View style={styles.container}>
      {gameHistory.length === 0 ? (
        <Text style={styles.noData}>No game history available.</Text>
      ) : (
        <FlatList
          data={gameHistory}
          renderItem={renderItem}
          keyExtractor={(item) => item.date}
        />
      )}
      <CustomButton title="Clear History" onPress={handleClearHistory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDetails: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    color: '#666',
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noData: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
});

export default LeaderboardScreen;