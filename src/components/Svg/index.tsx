type Props = {
  id?: string;
  name?: SvgName;
  size?: number | string;
  stroke?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
};

import { SVGS, type SvgName } from "./icons";

const Svg: React.FC<Props> = ({
  name = "default",
  size,
  stroke,
  strokeWidth,
  ...rest
}) => (
  <svg
    {...rest}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke || "var(--on-surface)"}
    style={{
      width: size || "var(--unit-s)",
      height: size || "var(--unit-s)",
      ...rest.style,
    }}
  >
    <path
      d={SVGS[name]}
      vectorEffect="non-scaling-stroke"
      strokeWidth={strokeWidth || 1.5}
    ></path>
  </svg>
);

export default Svg;
export { SVGS } from "./icons";
export type { SvgName } from "./icons";
