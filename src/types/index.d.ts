export {};

declare global {
  interface Identifiable {
    id: string;
  }

  interface Window {
    posthog: {
      capture: (id: string, props?: Record<string, unknown>) => void;
    };
  }

  namespace UI {
    interface Project extends Identifiable {
      title: string;
      timeline?: string;
      lines: string[];
      imgs: { src: ImageMetadata; chip?: string; logo?: ImageMetadata }[];
      link?: UI.Link;
    }

    type Link = {
      href: string;
      label: string;
      external?: boolean;
    };

    type Icon = {
      path?: string;
      text?: string;
    };

    namespace Quiz {
      interface BaseQuestion extends Identifiable {
        text: string;
        options: {
          id: string;
          label: string;
          response: {
            title: string;
            text: string;
          };
        }[];
      }

      interface GameQuestion extends Identifiable {
        text: string;
        options: {
          id: string;
          label: string;
          points: number;
          response: {
            title: string;
            text: string;
          };
        }[];
      }

      interface Game extends Identifiable {
        winScore: number;
        intro: {
          title: string;
          text: string;
        };
        outro: {
          winnerText: string;
          loserText: string;
        };
        questions: UI.Quiz.Question[];
      }
    }

    namespace Card {
      interface Fact extends Identifiable {
        type: "fact";
        title?: string;
        icon?: UI.Icon;
        text: string;
      }

      interface Facts extends Identifiable {
        type: "facts";
        title?: string;
        lines: string[];
      }

      interface CaseStudy extends Identifiable {
        type: "case-study";
        title: string;
        link: UI.Link;
      }

      interface ReleaseNote extends Identifiable {
        type: "release-note";
        version: string;
        title: string;
        link: UI.Link;
      }

      interface ProductEye extends Identifiable {
        type: "product-eye";
        title: string;
        text: string;
      }

      interface Survey extends Identifiable {
        type: "survey";
        surveyId: string;
        text: string;
        options: Quiz.BaseQuestion["options"][0][];
      }
    }

    interface StackCard<T> extends Identifiable {
      cards: Array<T>;
    }
  }
}
