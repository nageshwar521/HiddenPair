import {CARD_PAIRS_VALUE} from '../constants';

const shuffleArr = (arr: number[], newArr: number[] = []): number[] => {
  const arrRandPos = Math.floor(Math.random() * arr.length);
  const currentNum = arr.find((v, i) => i === arrRandPos);
  arr.splice(arrRandPos, 1);
  if (currentNum) {
    newArr.push(currentNum);
  }

  if (arr.length === 0) {
    return newArr;
  } else {
    return shuffleArr(arr, newArr);
  }
};

export const generateRandomNums = () => {
  const getRandomNum = () => Math.floor(Math.random() * 100);
  const nums = Array.from({length: CARD_PAIRS_VALUE}, getRandomNum);
  return shuffleArr([...nums, ...nums]);
};
