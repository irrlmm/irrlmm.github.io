export type Fact = {
  id: string;
  text: string;
  icon?: { path?: string; text?: string };
};

export type FactStack = {
  id: string;
  facts: Fact[];
};
