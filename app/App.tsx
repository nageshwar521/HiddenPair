import { Dimensions, View } from 'react-native';
import React, { useState } from 'react';
import Card from './components/Card';

const {width, height} = Dimensions.get('window');

const COLUMNS = 3;
const ROWS = 6;

const App = () => {
    const [currentNum, setCurrentNum] = useState<number | null>(null);
    const [isMatch, setIsMatch] = useState(false);
    const cardHeight = (height-100)/COLUMNS;
    const cardWidth = (width-50)/ROWS;

    const handleOpen = (num: number) => {
        if (currentNum && currentNum === num) {
            setIsMatch(true);
        } else {
            setCurrentNum(num);
        }
    };
  return (
    <View>
      <Card height={cardHeight} width={cardWidth} onOpen={handleOpen}>
        12
      </Card>
    </View>
  )
}

export default App;