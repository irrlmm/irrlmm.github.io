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
}
