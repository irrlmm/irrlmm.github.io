import type { FactStack } from "../../consts/facts";

import CardStack from "../CardStack";
import ContentRenderer from "./ContentRenderer";

type Props = {
  facts: FactStack;
};

export default ({ facts }: Props) => (
  <CardStack id={facts.id} cards={facts.facts} renderItem={ContentRenderer} />
);
