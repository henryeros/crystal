import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: SITE.url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  },
];

export default sitemap;
