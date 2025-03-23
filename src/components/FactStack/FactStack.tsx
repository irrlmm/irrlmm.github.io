import CardStack from "../CardStack";
import FactItem, { type Fact } from "./FactItem";

type Props = {
  facts: Fact[];
};

export default ({ facts }: Props) => (
  <CardStack cards={facts} renderItem={FactItem} isLandscape />
);
