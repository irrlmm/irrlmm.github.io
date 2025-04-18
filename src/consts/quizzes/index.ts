export type Quiz = {
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
  questions: {
    id: string;
    text: string;
    options: {
      label: string;
      points: number;
      response: {
        title: string;
        text: string;
      };
    }[];
  }[];
};
