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
  const nums: number[] = [];
  for (let i=0; i<CARD_PAIRS_VALUE; i++) {
    const randNum = getRandomNum();
    if (!nums.includes(randNum)) {
      nums.push(randNum);
    } else {
      const newRandNum = getRandomNum();
      nums.push(newRandNum);
    }
  }
  return shuffleArr([...nums, ...nums]);
};
