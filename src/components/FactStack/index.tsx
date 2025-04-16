import type { Fact } from "../../consts/facts";
import CardStack from "../CardStack";
import FactItem from "./FactItem";

type Props = {
  facts: Fact[];
};

export default ({ facts }: Props) => (
  <CardStack cards={facts} renderItem={FactItem} />
);
