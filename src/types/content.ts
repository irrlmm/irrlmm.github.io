export type Link = {
  href: string;
  label: string;
  external?: boolean;
};

type QuizOptionResponse = {
  title: string;
  text: string;
};

export type QuizGameOption = {
  id?: string;
  label: string;
  points: number;
  response: QuizOptionResponse;
};

export type QuizGameQuestion = {
  id: string;
  text: string;
  options: QuizGameOption[];
};

export type QuizGame = {
  id: string;
  winScore: number;
  intro: {
    title: string;
    text: string;
  };
  outro: {
    winnerText: string;
    loserText: string;
  };
  questions: QuizGameQuestion[];
};

type GameOptionResponse = {
  title: string;
  text: string;
};

export type CardGameOption = {
  id?: string;
  label: string;
  points: number;
  healthDelta?: number;
  armorDelta?: number;
  nextCardId: string;
  endingId?: string;
  response: GameOptionResponse;
};

export type CardGameCard = {
  id: string;
  text: string;
  options: CardGameOption[];
};

export type CardGameEnding = {
  id: string;
  title: string;
  text: string;
};

export type CardGameStat = {
  label?: string;
  min?: number;
  max?: number;
  initial?: number;
};

export type CardGameThemeColors = {
  primary: string;
  secondary: string;
  surface: string;
  surfaceDim: string;
  onSurface: string;
  onAccent: string;
  outline: string;
  overlayOnSurface: string;
};

export type CardGame = {
  id: string;
  startCardId: string;
  finishCardId: string;
  coverImage?: string;
  stats?: {
    health?: CardGameStat;
    armor?: CardGameStat;
  };
  intro: {
    title: string;
    text: string;
  };
  outro: {
    title: string;
    endings: CardGameEnding[];
  };
  cards: CardGameCard[];
};
