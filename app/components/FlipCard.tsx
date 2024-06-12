import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import SquareGridCardBack from './SquareGridCardBack';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.4; // 40% of the screen width
const cardHeight = cardWidth * 1.4; // Aspect ratio of 1:1.4

const FlipCard: React.FC = () => {
  const [flipped, setFlipped] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    if (flipped) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 800, // Adjust duration for faster animation
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 180,
        duration: 800, // Adjust duration for faster animation
        useNativeDriver: true,
      }).start();
    }
    setFlipped(!flipped);
  };

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <TouchableOpacity onPress={flipCard}>
      <View style={[styles.container, { width: cardWidth, height: cardHeight }]}>
        <Animated.View style={[styles.card, frontAnimatedStyle, styles.front]}>
          <SquareGridCardBack height={cardHeight} width={cardWidth} />
        </Animated.View>
        <Animated.View style={[styles.card, backAnimatedStyle, styles.back]}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>1234</Text>
          </View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    borderRadius: 10,
  },
  front: {
    backgroundColor: '#fff',
  },
  back: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  numberContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Match the border radius
  },
  number: {
    fontSize: 48,
    color: '#000',
  },
});

export default FlipCard;