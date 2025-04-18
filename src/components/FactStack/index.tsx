import type { FactStack } from "../../consts/facts";
import CardStack from "../CardStack";
import FactItem from "./FactItem";

type Props = {
  facts: FactStack;
};

export default ({ facts }: Props) => (
  <CardStack id={facts.id} cards={facts.facts} renderItem={FactItem} />
);
