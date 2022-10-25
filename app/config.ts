export type TGameModeTypes = 'easy' | 'medium' | 'hard';

export const GameTypes = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};

export const getGameMode = (mode: TGameModeTypes) => {
  switch (mode) {
    case GameTypes.HARD:
      return {
        rows: 15,
        columns: 5,
      };
    case GameTypes.MEDIUM:
      return {
        rows: 8,
        columns: 4,
      };
    default:
      return {
        rows: 4,
        columns: 3,
      };
  }
};
