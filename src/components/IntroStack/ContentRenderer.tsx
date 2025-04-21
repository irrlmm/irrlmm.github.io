import CaseStudyContent from "./components/CaseStudyContent";
import ProductEyeContent from "./components/ProductEyeContent";
import ReleaseNoteContent from "./components/ReleaseNoteContent";
import TextContent from "./components/TextContent";

type Props = {
  index?: number;
  card:
    | UI.Card.Fact
    | UI.Card.CaseStudy
    | UI.Card.ProductEye
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

    case "fact":
    default:
      return <TextContent card={props.card} />;
  }
};

export default ContentRenderer;
