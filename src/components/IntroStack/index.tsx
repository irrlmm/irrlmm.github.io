import CardStack from "../CardStack";
import ContentRenderer from "./ContentRenderer";

type Props = {
  facts: UI.CardStack<
    UI.Card.Fact | UI.Card.CaseStudy | UI.Card.ProductEye | UI.Card.ReleaseNote
  >;
};

export default ({ facts }: Props) => (
  <CardStack id={facts.id} cards={facts.cards} renderItem={ContentRenderer} />
);
