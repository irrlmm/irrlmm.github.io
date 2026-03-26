export type SvgMaskStyle = {
  WebkitMaskImage: string;
  maskImage: string;
};

const getSvgMaskStyle = (src: string): SvgMaskStyle => ({
  WebkitMaskImage: `url(${src})`,
  maskImage: `url(${src})`,
});

export default getSvgMaskStyle;
