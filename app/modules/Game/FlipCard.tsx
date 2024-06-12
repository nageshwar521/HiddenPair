import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import BackCard from './BackCard';
import FrontCard from './FrontCard';
// import SquareGridCardBack from './SquareGridCardBack';

interface FlipCardProps {
  width: number;
  height: number;
  number: number;
  isFlipped: boolean;
  onPress: () => void;
}

const FlipCard: React.FC<FlipCardProps> = ({ width, height, number, isFlipped, onPress }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFlipped ? 180 : 0,
      duration: 800, // Adjust duration for faster animation
      useNativeDriver: true,
    }).start();
  }, [isFlipped]);

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { width, height }]}>
        <Animated.View style={[styles.card, frontAnimatedStyle, styles.front]}>
          <BackCard height={height} width={width} />
        </Animated.View>
        <Animated.View style={[styles.card, backAnimatedStyle, styles.back]}>
          {/* <View style={styles.numberContainer}>
            <Text style={styles.number}>{number}</Text>
          </View> */}
          <FrontCard height={height} width={width} text={String(number)} />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  card: {
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