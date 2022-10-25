import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import React from 'react';
import { BG_PRIMARY_COLOR } from '../constants';
import createStyles from '../utils/createStyles';
import Card from './Card';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { TGameModeTypes, GameTypes, getGameMode } from '../config';

const { width, height } = Dimensions.get('window');

export interface IBoardProps {
  mode?: TGameModeTypes;
  nums: number[];
  currentNum: number;
  currentNumIndex: number;
  matchedNumIndexes: number[];
  unmatchedNumIndexes: number[];
  onToggle: (data: number, dataIndex: number) => void;
}

const Board: React.FC<IBoardProps> = ({
  mode = GameTypes.EASY,
  nums,
  currentNum,
  currentNumIndex,
  matchedNumIndexes,
  unmatchedNumIndexes,
  onToggle,
}) => {
  const styles = getStyles();

  const { rows, columns } = getGameMode(mode as TGameModeTypes);

  const statusBarHeight = getStatusBarHeight();

  const extraVerticalSpace = 180;

  const cardHeight = (height - statusBarHeight - extraVerticalSpace) / rows;
  const cardWidth = (width - 50) / columns;

  return (
    <View style={styles.cardsWrapper}>
      {nums.map((randNum: number, index: number) => {
        return (
          <Card
            data={randNum}
            dataIndex={index}
            currentNum={currentNum}
            currentNumIndex={currentNumIndex}
            key={`${randNum}_${index}`}
            height={cardHeight}
            width={cardWidth}
            matchedIndexes={matchedNumIndexes}
            unmatchedIndexes={unmatchedNumIndexes}
            onToggle={onToggle}>
            {randNum}
          </Card>
        );
      })}
    </View>
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

export default Board;
