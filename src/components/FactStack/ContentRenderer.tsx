import type { Fact } from "../../consts/facts";

import CaseStudyContent from "./content/CaseStudyContent";
import ProductEyeContent from "./content/ProductEyeContent";
import ReleaseNoteContent from "./content/ReleaseNoteContent";
import TextContent from "./content/TextContent";

type Props = {
  index?: number;
  card: Fact;
  trackMeta?: any;
};

const ContentRenderer: React.FC<Props> = (props) => {
  switch (props.card.type) {
    case "case-study":
      return <CaseStudyContent {...props} />;

    case "product-eye":
      return <ProductEyeContent {...props} />;

    case "release-note":
      return <ReleaseNoteContent {...props} />;

    default:
      return <TextContent {...props} />;
  }
};

export default ContentRenderer;
