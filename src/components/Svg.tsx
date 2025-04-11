type Props = {
  id?: string;
  d?: string;
  size?: number | string;
  stroke?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
};

import { SVG_DEFAULT } from "../consts/svg";

const Svg: React.FC<Props> = ({ d, size, stroke, strokeWidth, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke || "var(--on-surface)"}
    {...rest}
    style={{
      width: size || "var(--unit-s)",
      height: size || "var(--unit-s)",
      ...rest.style,
    }}
  >
    <path
      d={d || SVG_DEFAULT}
      vectorEffect="non-scaling-stroke"
      strokeWidth={strokeWidth || 2}
    ></path>
  </svg>
);

export default Svg;
