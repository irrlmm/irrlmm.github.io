const getImage = (path: string) => {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/**/*.{jpeg,jpg,png,gif,svg}"
  );

  if (!images["/src/assets/" + path]) {
    throw new Error(
      `"${
        "/src/assets/" + path
      }" does not exist in glob: "/src/assets/**/*.{jpeg,jpg,png,gif}"`
    );
  }

  return images["/src/assets/" + path];
};

export default getImage;
