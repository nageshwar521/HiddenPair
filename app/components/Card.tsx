import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

interface CardProps {
  number: number;
  isOpen: boolean;
  onPress: () => void;
  animatedValue: Animated.Value;
  cardSize: number;
}

const Card: React.FC<CardProps> = ({ number, isOpen, onPress, animatedValue, cardSize }) => {
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = animatedValue.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [1, 0, 1],
  });

  const backOpacity = animatedValue.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [1, 1, 0],
  });

  const frontStyle = {
    transform: [{ rotateY: frontInterpolate }],
    opacity: frontOpacity,
  };

  const backStyle = {
    transform: [{ rotateY: backInterpolate }],
    opacity: backOpacity,
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.cardContainer, { width: cardSize, height: cardSize * 1.4 }]}>
      <View>
        <Animated.View style={[styles.card, styles.cardBack, backStyle]}>
          <View style={styles.closedCard}>
            <Text style={styles.cardText}>🔒</Text>
          </View>
        </Animated.View>
        <Animated.View style={[styles.card, styles.cardFront, frontStyle]}>
          <View style={styles.openCard}>
            <Text style={styles.cardText}>{number}</Text>
          </View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  card: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardBack: {
    backgroundColor: '#1e3d59',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  closedCard: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1e3d59',
  },
  openCard: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  cardText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Card;