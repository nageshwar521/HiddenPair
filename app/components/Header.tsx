import {View, Text} from 'react-native';
import React from 'react';
import createStyles from '../utils/createStyles';
import Button from './Button';
import {TEXT_PRIMARY_COLOR} from '../constants';

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
        <Text style={styles.stepsTextStyle}>
          STEPS: <Text style={styles.stepsValueTextStyle}>{steps}</Text>
        </Text>
      </View>
    </View>
  );
};

const getStyles = () => {
  const styles = {
    container: {
      flexDirection: 'row',
      padding: 10,
    },
    column: {
      flex: 1,
    },
    left: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    right: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    restartTextStyle: {
      color: TEXT_PRIMARY_COLOR,
    },
    stepsTextStyle: {
      flexDirection: 'row',
      color: 'white',
    },
    stepsValueTextStyle: {
      color: TEXT_PRIMARY_COLOR,
      fontSize: 20,
    },
  };
  return createStyles(styles);
};

export default Header;
