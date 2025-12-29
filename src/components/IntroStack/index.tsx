import CardStack from "../SwipeCardStack";
import ContentRenderer from "./ContentRenderer";

type Props = {
  stack: UI.CardStack<
    | UI.Card.Fact
    | UI.Card.Facts
    | UI.Card.CaseStudy
    | UI.Card.ProductEye
    | UI.Card.ReleaseNote
    | UI.Card.Survey
  >;
  shuffle?: boolean;
};

function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default ({ stack, shuffle }: Props) => {
  return (
    <CardStack id={stack.id} cards={stack.cards} renderItem={ContentRenderer} />
  );
};
