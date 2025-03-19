const getImage = (image: string) => {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/**/*.{jpeg,jpg,png,gif,svg}"
  );

  if (!images[image]) {
    throw new Error(
      `"${image}" does not exist in glob: "/src/assets/**/*.{jpeg,jpg,png,gif}"`
    );
  }

  return images[image];
};

export default getImage;
