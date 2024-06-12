import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface MenuProps {
  setGameMode: (mode: 'easy' | 'medium' | 'hard') => void;
}

const Menu: React.FC<MenuProps> = ({ setGameMode }) => {
  return (
    <View style={styles.menu}>
      <Text style={styles.menuTitle}>Select Game Mode</Text>
      <TouchableOpacity style={styles.menuButton} onPress={() => setGameMode('easy')}>
        <Text style={styles.menuButtonText}>Easy (3x4)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={() => setGameMode('medium')}>
        <Text style={styles.menuButtonText}>Medium (4x5)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={() => setGameMode('hard')}>
        <Text style={styles.menuButtonText}>Hard (5x6)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#1e3d59',
    borderRadius: 10,
    marginBottom: 10,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Menu;