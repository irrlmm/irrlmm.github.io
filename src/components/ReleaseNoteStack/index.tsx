import CardStack from "../SwipeCardStack";

import ReleaseNoteItem from "./ReleaseNoteItem";

type Props = {
  releaseNotes: UI.CardStack<UI.Card.ReleaseNote>;
};

export default ({ releaseNotes }: Props) => (
  <CardStack
    id={releaseNotes.id}
    cards={releaseNotes.cards}
    renderItem={ReleaseNoteItem}
  />
);
