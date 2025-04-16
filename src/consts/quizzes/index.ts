export type Quiz = {
  intro: {
    title: string;
    text: string;
  };
  outro: {
    winScore: number;
    winner: {
      title: string;
      text: string;
    };
    loser: {
      title: string;
      text: string;
    };
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
