import styles from "./styles.module.css";

type Props = {
  src: string;
  aspectRatio?: React.CSSProperties["aspectRatio"];
  className?: string;
  style?: React.CSSProperties;
  label?: string;
};

function getSvgMaskStyle(src: string) {
  return {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
  };
}

const SvgMaskImage: React.FC<Props> = ({
  src,
  aspectRatio,
  className,
  style,
  label,
}) => (
  <span
    className={[styles.root, className].filter(Boolean).join(" ")}
    role={label ? "img" : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : true}
    style={{
      aspectRatio,
      ...getSvgMaskStyle(src),
      ...style,
    }}
  />
);

export default SvgMaskImage;
