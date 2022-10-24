import React, {Fragment, useEffect, useRef, useState} from 'react';
import createStyles from '../utils/createStyles';
import Content from './Content';
import {Animated, StyleProp, View} from 'react-native';
import Button from './Button';
import {
  CARD_BORDER_COLOR,
  CLOSE_CARD_BG_COLOR,
  OPEN_CARD_BG_COLOR,
} from '../constants';

export type IFlipTypeOptions = 'OPEN' | 'CLOSE';

export interface ICardProps {
  width: number;
  height: number;
  onToggle: (data: number, index: number) => void;
  children: any;
  style?: StyleProp<any>;
  contentStyle?: StyleProp<any>;
  data: number;
  dataIndex: number;
  matchedIndexes: number[];
  unmatchedIndexes: number[];
  currentNum: number;
  currentNumIndex: number;
}

const Card: React.FC<ICardProps> = ({
  children,
  onToggle,
  width,
  height,
  style = {},
  contentStyle = {},
  data,
  dataIndex,
  matchedIndexes,
  unmatchedIndexes,
  currentNum,
  currentNumIndex,
}) => {
  const styles = getStyles(height, width);

  const animatedStartValue = new Animated.Value(0);
  const flipAnimatedValue = useRef(animatedStartValue).current;

  const isCardOpen = currentNum === data && currentNumIndex === dataIndex;

  let flipRotation = 0;
  flipAnimatedValue.addListener(
    ({value}: {value: number}) => (flipRotation = value),
  );

  const flipToOpenAnimation = (callback: () => void = () => {}) => {
    console.log('flipToOpenAnimation');
    Animated.timing(flipAnimatedValue, {
      toValue: 180,
      duration: 400,
      useNativeDriver: false,
    }).start(callback);
  };

  const flipToCloseAnimation = () => {
    console.log('flipToCloseAnimation');
    Animated.timing(flipAnimatedValue, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const flipToOpenInterpolate = flipAnimatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const flipToCloseInterpolate = flipAnimatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipToFrontAnimatedStyle = {
    transform: [{rotateY: flipToOpenInterpolate}],
  };

  const flipToBackAnimatedStyle = {
    transform: [{rotateY: flipToCloseInterpolate}],
  };

  const handleDisabledPress = () => {
    console.log('handleDisabledPress');
  };

  useEffect(() => {
    // console.log(currentNumIndex, 'currentNumIndex');
    // console.log(dataIndex, 'dataIndex');
    if (isCardOpen) {
      flipToOpenAnimation();
    }
  }, [isCardOpen]);

  useEffect(() => {
    // console.log(dataIndex, 'dataIndex');
    // console.log(matchedIndexes, 'matchedIndexes');
    // console.log(unmatchedIndexes, 'unmatchedIndexes');

    if (matchedIndexes.includes(dataIndex)) {
      flipToOpenAnimation();
    } else if (unmatchedIndexes.includes(dataIndex)) {
      flipToCloseAnimation();
    }
  }, [dataIndex, matchedIndexes, unmatchedIndexes]);

  // console.log(isMatch, 'isMatch');

  const handlePress = () => {
    // console.log(currentNumIndex, 'currentNumIndex');
    // console.log(dataIndex, 'dataIndex');
    flipToOpenAnimation(() => {
      if (onToggle) {
        onToggle(data, dataIndex);
      }
    });
  };

  return (
    <Button
      style={[styles.card, style]}
      onPress={currentNumIndex !== dataIndex ? handlePress : () => {}}>
      <Animated.View style={{...styles.openStyle, ...flipToBackAnimatedStyle}}>
        <Content
          style={[styles.textStyle, styles.closeTextStyle, contentStyle]}>
          {children}
        </Content>
      </Animated.View>
      <Animated.View
        style={{...styles.closeStyle, ...flipToFrontAnimatedStyle}}>
        <Content
          style={[
            styles.textStyle,
            isCardOpen ? styles.openTextStyle : styles.closeTextStyle,
            contentStyle,
          ]}>
          ?
        </Content>
      </Animated.View>
    </Button>
  );
};

const getStyles = (height: number, width: number) => {
  const styles = {
    card: {
      margin: 5,
    },
    openStyle: {
      height,
      width,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      borderRadius: 10,
      borderWidth: 5,
      borderColor: CARD_BORDER_COLOR,
      backgroundColor: CLOSE_CARD_BG_COLOR,
      backfaceVisibility: 'hidden',
    },
    closeStyle: {
      height,
      width,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      borderWidth: 5,
      borderColor: CARD_BORDER_COLOR,
      backgroundColor: OPEN_CARD_BG_COLOR,
      backfaceVisibility: 'hidden',
    },
    textStyle: {
      fontSize: 24,
    },
    openTextStyle: {
      color: '#FFFFFF',
    },
    closeTextStyle: {
      color: '#000000',
    },
  };
  return createStyles(styles);
};

export default Card;
