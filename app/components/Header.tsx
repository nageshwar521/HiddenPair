import {View, Text} from 'react-native';
import React from 'react';
import createStyles from '../utils/createStyles';
import Button from './Button';

export interface IHeaderProps {
  steps: number;
  onRestart: () => void;
}

const Header: React.FC<IHeaderProps> = ({steps = 0, onRestart}) => {
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <View style={[styles.column, styles.left]}>
        <Button
          style={styles.restartButtonStyle}
          contentStyle={styles.restartTextStyle}
          onPress={onRestart}>
          RESTART
        </Button>
      </View>
      <View style={[styles.column, styles.right]}>
        <Text style={styles.stepsTextStyle}>STEPS: {steps}</Text>
      </View>
    </View>
  );
};

const getStyles = () => {
  const styles = {
    container: {
      flexDirection: 'row',
      padding: 10,
      marginBottom: 10,
    },
    column: {
      flex: 1,
    },
    left: {
      justifyContent: 'flex-start',
    },
    right: {
      alignItems: 'flex-end',
    },
    restartTextStyle: {
      color: 'white',
    },
    stepsTextStyle: {
      color: 'white',
    },
  };
  return createStyles(styles);
};

export default Header;
