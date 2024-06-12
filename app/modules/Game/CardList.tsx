import React from 'react';
import { View, StyleSheet } from 'react-native';
import FlipCard from './FlipCard';

interface CardListProps {
  rows: number;
  cols: number;
  cardWidth: number;
  cardHeight: number;
  randomNumbers: number[][];
  flippedCards: boolean[][];
  onCardPress: (row: number, col: number, number: number) => void;
}

const CardList: React.FC<CardListProps> = ({ rows, cols, cardWidth, cardHeight, randomNumbers, flippedCards, onCardPress }) => {
  const renderCardList = () => {
    let grid = [];
    for (let row = 0; row < rows; row++) {
      let rowCards = [];
      for (let col = 0; col < cols; col++) {
        const isFlipped = flippedCards[row][col];
        const number = randomNumbers[row][col];
        rowCards.push(
          <FlipCard
            key={`${row}-${col}`}
            width={cardWidth}
            height={cardHeight}
            number={number}
            isFlipped={isFlipped}
            onPress={() => onCardPress(row, col, number)}
          />
        );
      }
      grid.push(
        <View key={row} style={styles.row}>
          {rowCards}
        </View>
      );
    }
    return grid;
  };

  return <View style={styles.container}>{renderCardList()}</View>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
  },
});

export default CardList;