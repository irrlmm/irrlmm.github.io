export {};

type EventId =
  | "site:cardstack_started"
  | "site:cardstack_card_viewed"
  | "site:cardstack_halfway"
  | "site:cardstack_completed"
  | "site:cardstack_replayed"
  | "site:quiz_started"
  | "site:quiz_card_answered"
  | "site:quiz_halfway"
  | "site:quiz_completed"
  | "site:quiz_replayed";

type EventProps = {
  id: string;
  [x: string]: any;
};

declare global {
  interface Window {
    posthog: {
      capture: (id: EventId, props: EventProps) => void;
    };
  }

  namespace UI {
    type Link = {
      href: string;
      label: string;
      external?: boolean;
    };

    type Icon = {
      path?: string;
      text?: string;
    };

    namespace Card {
      interface Generic {
        id: string;
      }

      interface Fact extends Generic {
        type?: "fact";
        title?: string;
        icon?: UI.Icon;
        text: string;
      }

      interface CaseStudy extends Generic {
        type: "case-study";
        title: string;
        link: UI.Link;
      }

      interface ReleaseNote extends Generic {
        type: "release-note";
        version: string;
        title: string;
        link: UI.Link;
      }

      interface ProductEye extends Generic {
        type: "product-eye";
        title: string;
        text: string;
      }
    }

    type CardStack<T> = {
      id: string;
      cards: Array<T>;
    };
  }
}
