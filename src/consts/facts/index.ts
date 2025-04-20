export type Fact = {
  id: string;
  type?: "case-study" | "product-eye" | "release-note" | "default";
  payload: {
    title?: string;
    text?: string;
    lines?: string[];
    icon?: { path?: string; text?: string };
    image?: string;
    link?: {
      label: string;
      href: string;
      external?: boolean;
    };
  };
};

export type FactStack = {
  id: string;
  facts: Fact[];
};
