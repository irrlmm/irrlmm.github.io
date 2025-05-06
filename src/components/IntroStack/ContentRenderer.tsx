import { memo } from "react";
import CaseStudyContent from "./components/CaseStudyContent";
import ProductEyeContent from "./components/ProductEyeContent";
import PunchlineContent from "./components/PunchlineContent";
import ReleaseNoteContent from "./components/ReleaseNoteContent";
import TextContent from "./components/TextContent";
import SurveyContent from "./components/SurveyContent";

type Props = {
  index?: number;
  card:
    | UI.Card.Fact
    | UI.Card.Facts
    | UI.Card.CaseStudy
    | UI.Card.ProductEye
    | UI.Card.Survey
    | UI.Card.ReleaseNote;
  trackMeta?: any;
};

const ContentRenderer: React.FC<Props> = (props) => {
  switch (props.card.type) {
    case "case-study":
      return <CaseStudyContent card={props.card} />;

    case "product-eye":
      return (
        <ProductEyeContent
          index={props.index}
          card={props.card}
          trackMeta={props.trackMeta}
        />
      );

    case "release-note":
      return <ReleaseNoteContent card={props.card} />;

    case "facts":
      return <PunchlineContent index={props.index} card={props.card} />;

    case "survey":
      return <SurveyContent card={props.card} />;

    case "fact":
    default:
      return <TextContent card={props.card} />;
  }
};

export default memo(ContentRenderer);
