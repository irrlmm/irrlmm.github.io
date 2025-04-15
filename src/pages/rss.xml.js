import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { META } from "../consts/meta";

export async function GET(context) {
  const posts = await getCollection("work");
  return rss({
    title: META.title,
    description: META.description,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/work/${post.id}/`,
    })),
  });
}
