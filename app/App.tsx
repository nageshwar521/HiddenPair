import { Dimensions, SafeAreaView, ScrollView, View } from 'react-native';
import React from 'react';
import createStyles from './utils/createStyles';
import { BG_PRIMARY_COLOR } from './constants';
import Game from './containers/Game';

const App = () => {
  const styles = getStyles();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Game />
    </SafeAreaView>
  );
};

const getStyles = () => {
  const styles = {
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: BG_PRIMARY_COLOR,
    },
    cardsWrapper: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  };
  return createStyles(styles);
};

export default App;
