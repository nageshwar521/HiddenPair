import React, { useState } from 'react';
import createStyles from '../utils/createStyles';
import Content from './Content';
import { Animated, StyleProp } from 'react-native';
import Button from './Button';
import { CARD_BORDER_COLOR, CLOSE_CARD_BG_COLOR, OPEN_CARD_BG_COLOR } from '../constants';

export type IFlipTypeOptions = 'OPEN' | 'CLOSE';

export interface ICardProps {
    width: number;
    height: number;
    onOpen: (num: number) => void;
    children: any;
    style?: StyleProp<any>;
    contentStyle?: StyleProp<any>;
}

const Card: React.FC<ICardProps> = ({children, onOpen, width, height, style = {}, contentStyle = {}}) => {
  const [flipType, setFlipType] = useState<IFlipTypeOptions>('CLOSE');
  const defaultStyles = getStyles(height, width);

  let animatedValue = new Animated.Value(0);
  let currentValue = 0;

  animatedValue.addListener(({ value }) => {
    currentValue = value;
  });

  const closeCardAnimation = () => {
    Animated.spring(animatedValue, {
      toValue: 0,
      tension: 10,
      friction: 8,
      useNativeDriver: false,
    }).start();
  };

  const openCardAnimation = () => {
    Animated.spring(animatedValue, {
        toValue: 180,
        tension: 10,
        friction: 8,
        useNativeDriver: false,
      }).start();
  };

  const setInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const rotateYAnimatedStyle = {
    transform: [{ rotateY: setInterpolate }],
  };

  const handlePress = () => {
    setFlipType(flipType === 'CLOSE' ? 'OPEN' : 'CLOSE');
    if (flipType === 'CLOSE') {
      closeCardAnimation();
    } else {
      openCardAnimation();
    }
    if (onOpen) {
      onOpen(children);
    }
  };

  return (
    <Animated.View style={rotateYAnimatedStyle}>
      <Button style={[defaultStyles, style, flipType === 'CLOSE' ? defaultStyles.closeStyle : defaultStyles.openStyle]} onPress={handlePress}>
        <Content style={[flipType === 'CLOSE' ? defaultStyles.closeTextStyle : defaultStyles.openTextStyle, contentStyle]}>{children || '?'}</Content>
      </Button>
    </Animated.View>
  )
}

const getStyles = (height: number, width: number) => {
  const styles = {
    container: {height, width, flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: '5px'},
    closeStyle: {
      borderWidth: 3,
      borderColor: CARD_BORDER_COLOR,
      backgroundColor: CLOSE_CARD_BG_COLOR
    },
    openStyle: {
      borderWidth: 3,
      borderColor: CARD_BORDER_COLOR,
      backgroundColor: OPEN_CARD_BG_COLOR
    },
    openTextStyle: {
      color: '#FFFFFF',
    },
    closeTextStyle: {
      color: '#000000',
    }
  };
  return createStyles(styles);
}

export default Card;