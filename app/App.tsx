import {Dimensions, SafeAreaView, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Card from './components/Card';
import createStyles from './utils/createStyles';
import {generateRandomNums} from './utils/common';
import Header from './components/Header';
import Alert from './components/Alert';
import {BG_PRIMARY_COLOR} from './constants';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const {width, height} = Dimensions.get('window');

const COLUMNS = 3;
const ROWS = 4;

const defaultRandomNums = generateRandomNums();

const App = () => {
  const [steps, setSteps] = useState<number>(0);
  const [unmatchedNumIndexes, setUnmatchedNumIndexes] = useState<number[]>([]);
  const [matchedNumIndexes, setMatchedNumIndexes] = useState<number[]>([]);
  const [randomNums, setRandomNums] = useState<number[]>(defaultRandomNums);
  const [currentNum, setCurrentNum] = useState<number>(-1);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isDone, setIsDone] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const statusBarHeight = getStatusBarHeight();

  const extraVerticalSpace = 180;

  const cardHeight = (height - statusBarHeight - extraVerticalSpace) / ROWS;
  const cardWidth = (width - 50) / COLUMNS;
  const styles = getStyles();
  // console.log(statusBarHeight, 'statusBarHeight');
  // console.log(height, 'height');
  // console.log(cardHeight, 'cardHeight');

  const handleToggle = (data: number, dataIndex: number) => {
    console.log('handleToggle', data);
    setSteps(steps + 1);
    if (currentNum === -1) {
      setCurrentNum(data);
      setCurrentIndex(dataIndex);
    }
    if (currentNum === data) {
      setMatchedNumIndexes([...matchedNumIndexes, currentIndex, dataIndex]);
      setCurrentNum(-1);
      setCurrentIndex(-1);
    } else if (currentNum !== -1) {
      setUnmatchedNumIndexes([...unmatchedNumIndexes, currentIndex, dataIndex]);
      setCurrentNum(-1);
      setCurrentIndex(-1);
    }
  };

  const handleRestart = () => {
    setIsReset(() => true);
    setSteps(0);
    setRandomNums([]);
    setMatchedNumIndexes([]);
    setUnmatchedNumIndexes([]);
    setCurrentNum(-1);
    setCurrentIndex(-1);
    setTimeout(() => {
      setRandomNums(generateRandomNums());
    }, 10);
  };

  const handleReset = () => {
    console.log('handleReset');
  };

  const handleCloseAlert = () => {
    setIsDone(false);
    handleRestart();
  };

  const isAllOpened = matchedNumIndexes.length === randomNums.length;

  useEffect(() => {
    if (!isReset && isAllOpened) {
      setIsDone(true);
      setIsReset(false);
    }
  }, [isAllOpened]);

  console.log(matchedNumIndexes, 'matchedNumIndexes');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header steps={steps} onRestart={handleRestart} />
        <View style={styles.cardsWrapper}>
          {randomNums.map((randNum: number, index: number) => {
            return (
              <Card
                data={randNum}
                dataIndex={index}
                currentNum={currentNum}
                currentNumIndex={currentIndex}
                key={`${randNum}_${index}`}
                height={cardHeight}
                width={cardWidth}
                matchedIndexes={matchedNumIndexes}
                unmatchedIndexes={unmatchedNumIndexes}
                onToggle={handleToggle}>
                {randNum}
              </Card>
            );
          })}
        </View>
        {isDone ? (
          <Alert
            buttonText="Try another round"
            content={`You win this game by ${steps} steps!`}
            isOpen
            onClose={handleCloseAlert}
          />
        ) : null}
      </View>
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
