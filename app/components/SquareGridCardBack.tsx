import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import SpadeIconTop from './SpadeIconTop';

interface SquareGridCardBackProps {
  width: number;
  height: number;
}

const SquareGridCardBack: React.FC<SquareGridCardBackProps> = ({ width, height }) => {
  const padding = 1; // Reduced padding
  const borderWidth = 2;

  const availableWidth = width - 2 * padding - 2 * borderWidth;
  const availableHeight = height - 2 * padding - 2 * borderWidth;

  const squareSize = Math.min(
    (availableWidth - 2) / 8,  // subtracting the margin for 8 squares
    (availableHeight - 2) / 8  // subtracting the margin for 8 squares
  );

  const numCols = Math.floor(availableWidth / (squareSize + 2)); // including margin
  const numRows = Math.floor(availableHeight / (squareSize + 2)); // including margin

  const gridWidth = numCols * (squareSize + 2) - 2;
  const gridHeight = numRows * (squareSize + 2) - 2;

  const offsetX = (availableWidth - gridWidth) / 2;
  const offsetY = (availableHeight - gridHeight) / 2;

  const renderSquares = useMemo(() => {
    const squares: JSX.Element[] = [];
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        squares.push(
          <View
            key={`${row}-${col}`}
            style={[
              styles.square,
              { width: squareSize, height: squareSize }
            ]}
          >
            <SpadeIconTop />
          </View>
        );
      }
    }
    return squares;
  }, [numRows, numCols, squareSize]);

  return (
    <View style={[styles.cardContainer, { width, height }]}>
      <View style={[styles.gridContainer, { paddingLeft: offsetX, paddingTop: offsetY }]}>
        {renderSquares}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 10,
    padding: 0, // Reduced padding
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
  },
  square: {
    margin: 1, // Margin between squares
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SquareGridCardBack;