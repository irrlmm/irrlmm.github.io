export type TEST_TYPE_STRUCTURE = {
  id: string;
  label: string;
};

export type TEST_TYPE = {
  id: string;
  label: string;
  icon: string;
  values: {
    id: TEST_TYPE_STRUCTURE["id"];
    value: string;
  }[];
};

export type TEST_ANSWER = {
  type: TEST_TYPE["id"];
  label: string;
};

export type TEST_QUESTION = {
  id: string;
  title: string;
  answers: TEST_ANSWER[];
};

export type TEST_SCHEMA = {
  intro: {
    icon: string;
    title: string;
    text: string;
  };
  outro: {
    title: string;
    text: string;
  };
  typeStructure: TEST_TYPE_STRUCTURE[];
  types: TEST_TYPE[];
  questions: TEST_QUESTION[];
};
