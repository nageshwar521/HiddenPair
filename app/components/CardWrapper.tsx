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
import Card from './Card';

export type IFlipTypeOptions = 'OPEN' | 'CLOSE';

export interface ICardWrapperProps {
  width: number;
  height: number;
  onOpen: (num: number) => void;
  children: any;
  style?: StyleProp<any>;
  contentStyle?: StyleProp<any>;
  disabled: boolean;
  isMatch: boolean;
}

const CardWrapper: React.FC<ICardWrapperProps> = ({
  children,
  onOpen,
  width,
  height,
  style = {},
  contentStyle = {},
  disabled = false,
  isMatch = false,
}) => {
  console.log(isMatch, 'isMatch');
  const [flipType, setFlipType] = useState<IFlipTypeOptions>('CLOSE');
  const styles = getStyles(height, width);

  const animatedStartValue = new Animated.Value(0);
  const flipAnimatedValue = useRef(animatedStartValue).current;

  let flipRotation = 0;
  flipAnimatedValue.addListener(
    ({value}: {value: number}) => (flipRotation = value),
  );

  const flipToFrontAnimation = () => {
    Animated.timing(flipAnimatedValue, {
      toValue: 180,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  const flipToBackAnimation = () => {
    Animated.timing(flipAnimatedValue, {
      toValue: 0,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  const flipToFrontInterpolate = flipAnimatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const flipToBackInterpolate = flipAnimatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipToFrontAnimatedStyle = {
    transform: [{rotateY: flipToFrontInterpolate}],
  };

  const flipToBackAnimatedStyle = {
    transform: [{rotateY: flipToBackInterpolate}],
  };

  const handleDisabledPress = () => {
    console.log('handleDisabledPress');
  };

  // useEffect(() => {
  //   if (!isMatch) {
  //     closeCardAnimation();
  //   }
  // }, [isMatch]);

  const handlePress = () => {
    setFlipType(flipType === 'CLOSE' ? 'OPEN' : 'CLOSE');
    if (flipType === 'CLOSE') {
      flipToBackAnimation();
    } else {
      flipToFrontAnimation();
    }
    if (onOpen) {
      onOpen(children);
    }
  };

  return (
    <Button
      style={[styles.buttonStyle, style]}
      onPress={disabled ? handleDisabledPress : handlePress}>
      <Animated.View
        style={[
          styles.animatedBox,
          flipToFrontAnimatedStyle,
          flipType === 'CLOSE' ? styles.closeStyle : styles.openStyle,
        ]}>
        <Card width={width} height={height}>
          {children}
        </Card>
      </Animated.View>
      <Animated.View
        style={[
          styles.animatedBox,
          flipToBackAnimatedStyle,
          flipType === 'CLOSE' ? styles.closeStyle : styles.openStyle,
        ]}>
        <Content
          style={[
            styles.textStyle,
            flipType === 'CLOSE' ? styles.closeTextStyle : styles.openTextStyle,
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
    buttonStyle: {
      height,
      width,
      borderRadius: 10,
      margin: 5,
    },
    animatedBox: {
      height,
      width,
      alignItems: 'center',
      justifyContent: 'center',
    },
    openStyle: {
      position: 'absolute',
      borderWidth: 3,
      borderColor: CARD_BORDER_COLOR,
      backgroundColor: OPEN_CARD_BG_COLOR,
    },
    closeStyle: {
      borderWidth: 3,
      borderColor: CARD_BORDER_COLOR,
      backgroundColor: CLOSE_CARD_BG_COLOR,
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
