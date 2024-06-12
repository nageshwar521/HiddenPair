// screens/AboutScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const AboutScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text h1>About This Game</Text>
      <Text style={styles.text}>
        Welcome to the Game App! This app is designed to provide hours of entertainment with exciting gameplay. Stay tuned for more updates and features!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AboutScreen;