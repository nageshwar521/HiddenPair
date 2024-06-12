import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import SpadeIconTop from './SpadeIconTop';

interface SquareGridCardBackProps {
  width: number;
  height: number;
}

const SquareGridCardBack: React.FC<SquareGridCardBackProps> = ({ width, height }) => {
  const padding = 1;
  const borderWidth = 2;
  const squareSize = useMemo(() => {
    const availableWidth = width - 2 * padding - 2 * borderWidth;
    const availableHeight = height - 2 * padding - 2 * borderWidth;
    return Math.min((availableWidth - 2) / 8, (availableHeight - 2) / 8);
  }, [width, height]);

  const numCols = useMemo(() => Math.floor((width - 2 * padding - 2 * borderWidth) / (squareSize + 2)), [width, squareSize]);
  const numRows = useMemo(() => Math.floor((height - 2 * padding - 2 * borderWidth) / (squareSize + 2)), [height, squareSize]);

  const offsetX = (width - (numCols * (squareSize + 2) - 2)) / 2;
  const offsetY = (height - (numRows * (squareSize + 2) - 2)) / 2;

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