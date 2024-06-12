import { useState, useEffect, useCallback } from 'react';

interface Card {
  row: number;
  col: number;
  number: number;
}

const generateRandomNumbers = (rows: number, cols: number): number[][] => {
  const totalCards = rows * cols;

  if (totalCards % 2 !== 0) {
    throw new Error("The number of cards must be even.");
  }

  const uniqueNumbersCount = totalCards / 2;
  const numbers: number[] = [];

  for (let i = 0; i < uniqueNumbersCount; i++) {
    let randomNumber: number;
    do {
      randomNumber = Math.floor(Math.random() * 100);
    } while (numbers.filter(num => num === randomNumber).length >= 2);
    numbers.push(randomNumber);
    numbers.push(randomNumber);
  }

  for (let i = 0; i < 3; i++) {
    shuffleArray(numbers);
  }

  const gridNumbers: number[][] = [];
  for (let row = 0; row < rows; row++) {
    const rowNumbers: number[] = [];
    for (let col = 0; col < cols; col++) {
      rowNumbers.push(numbers[row * cols + col]);
    }
    gridNumbers.push(rowNumbers);
  }

  return gridNumbers;
};

const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const useGameLogic = (
  rows: number,
  cols: number,
  onCardFlip: () => void,
  onRestart: () => void,
  onGoHome: () => void
) => {
  const [randomNumbers, setRandomNumbers] = useState<number[][]>(() =>
    generateRandomNumbers(rows, cols)
  );
  const [flippedCards, setFlippedCards] = useState<boolean[][]>(
    Array.from({ length: rows }, () => Array(cols).fill(false))
  );
  const [openedCards, setOpenedCards] = useState<Card[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const resetGame = useCallback(() => {
    setRandomNumbers(generateRandomNumbers(rows, cols));
    setFlippedCards(Array.from({ length: rows }, () => Array(cols).fill(false)));
    setOpenedCards([]);
    setDisabled(false);
    setIsGameOver(false);
  }, [rows, cols]);

  const checkMatch = useCallback(() => {
    if (openedCards.length === 2) {
      const [firstCard, secondCard] = openedCards;
      if (firstCard.number === secondCard.number) {
        setOpenedCards([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlippedCards(prevState =>
            prevState.map((row, rowIndex) =>
              row.map((col, colIndex) =>
                (rowIndex === firstCard.row && colIndex === firstCard.col) ||
                (rowIndex === secondCard.row && colIndex === secondCard.col)
                  ? false
                  : col
              )
            )
          );
          setOpenedCards([]);
          setDisabled(false);
        }, 400);
      }
    }
  }, [openedCards]);

  const handleCardPress = useCallback(
    (row: number, col: number, number: number) => {
      if (flippedCards[row][col] || openedCards.length === 2 || disabled) return;

      setFlippedCards(prevState =>
        prevState.map((r, rowIndex) =>
          r.map((c, colIndex) =>
            rowIndex === row && colIndex === col ? true : c
          )
        )
      );

      setOpenedCards(prevState => {
        const newOpenedCards = [...prevState, { row, col, number }];
        if (newOpenedCards.length === 2) {
          setDisabled(true);
          setTimeout(() => {
            checkMatch();
          }, 200);
        }
        return newOpenedCards;
      });

      onCardFlip();
    },
    [flippedCards, openedCards, disabled, checkMatch, onCardFlip]
  );

  useEffect(() => {
    if (openedCards.length === 2) {
      checkMatch();
    }
  }, [openedCards, checkMatch]);

  useEffect(() => {
    if (flippedCards.flat().every(card => card)) {
      setIsGameOver(true);
    }
  }, [flippedCards]);

  return { randomNumbers, flippedCards, handleCardPress, resetGame, isGameOver };
};

export default useGameLogic;