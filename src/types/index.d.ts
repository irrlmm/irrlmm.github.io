export {};

type EventId =
  | "site:card_viewed"
  | "site:cardstack_started"
  | "site:cardstack_halfway"
  | "site:cardstack_completed"
  | "site:cardstack_replayed";

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
