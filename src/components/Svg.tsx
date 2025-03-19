type Props = {
  id?: string;
  d?: string;
  stroke?: string;
  strokeWidth?: number;
};

import { SVG_DEFAULT } from "../consts/svg";

const Svg: React.FC<Props> = ({ d, stroke, strokeWidth, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="none"
    vector-effect="non-scaling-stroke"
    {...rest}
  >
    <path d={d || SVG_DEFAULT}></path>
  </svg>
);

export default Svg;
