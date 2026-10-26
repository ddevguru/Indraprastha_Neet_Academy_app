import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.indraprasthaneetacademy.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/profile/", "/tests/take/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
