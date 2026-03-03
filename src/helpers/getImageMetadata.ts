const getImageMetadata = (path: string) => {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    "/assets/**/*.{jpeg,jpg,png,gif,svg}",
  );
  const normalizedPath = path.replace(/^\//, "").replace(/^assets\//, "");
  const key = `/assets/${normalizedPath}`;

  if (!images[key]) {
    throw new Error(
      `"${key}" does not exist in glob: "/assets/**/*.{jpeg,jpg,png,gif,svg}"`,
    );
  }

  return images[key];
};

export default getImageMetadata;
