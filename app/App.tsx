import {Dimensions, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import Card from './components/Card';
import createStyles from './utils/createStyles';
import {generateRandomNums} from './utils/common';
import Header from './components/Header';

const {width, height} = Dimensions.get('screen');

const COLUMNS = 3;
const ROWS = 6;

const defaultRandomNums = generateRandomNums();

const App = () => {
  const [steps, setSteps] = useState<number>(0);
  const [unmatchedNumIndexes, setUnmatchedNumIndexes] = useState<number[]>([]);
  const [matchedNumIndexes, setMatchedNumIndexes] = useState<number[]>([]);
  const [randomNums, setRandomNums] = useState<number[]>(defaultRandomNums);
  const [currentNum, setCurrentNum] = useState<number>(-1);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const cardHeight = (height - 50) / ROWS;
  const cardWidth = (width - 50) / COLUMNS;
  const styles = getStyles();

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
    setSteps(0);
    setRandomNums([]);
    setMatchedNumIndexes([]);
    setUnmatchedNumIndexes([]);
    setCurrentNum(-1);
    setCurrentIndex(-1);
    setTimeout(() => {
      setRandomNums(defaultRandomNums);
    }, 10);
  };

  const handleReset = () => {
    console.log('handleReset');
  };

  console.log(randomNums, 'randomNums');

  return (
    <View style={styles.container}>
      <Header steps={steps} onRestart={handleRestart} />
      <ScrollView contentContainerStyle={styles.cardsWrapper}>
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
      </ScrollView>
    </View>
  );
};

const getStyles = () => {
  const styles = {
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#333',
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
