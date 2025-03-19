type Props = {
  id?: string;
  d?: string;
  size?: number;
  stroke?: string;
  strokeWidth?: number;
};

import { SVG_DEFAULT } from "../consts/svg";

const Svg: React.FC<Props> = ({ d, size, stroke, strokeWidth, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke || "var(--on-surface)"}
    strokeWidth={strokeWidth || 1.5}
    {...rest}
  >
    <path d={d || SVG_DEFAULT} vector-effect="non-scaling-stroke"></path>
  </svg>
);

export default Svg;
