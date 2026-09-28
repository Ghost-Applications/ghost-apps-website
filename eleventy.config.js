import { existsSync } from "node:fs";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/pgp.asc");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({ "src/*.md": "sources" });
  eleventyConfig.addPassthroughCopy({ "src/*.md.asc": "sources" });
  eleventyConfig.addPassthroughCopy({ "src/blog/posts/*.md": "sources/blog/posts" });
  eleventyConfig.addPassthroughCopy({ "src/blog/posts/*.md.asc": "sources/blog/posts" });

  eleventyConfig.addFilter("isSigned", (inputPath) => existsSync(`${inputPath}.asc`));
  eleventyConfig.addFilter("sourceUrl", (inputPath) => inputPath.replace(/^\.\/src\//, "/sources/"));

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addGlobalData("siteUrl", "https://ghostapps.rocks");
  eleventyConfig.addGlobalData("currentYear", () => new Date().getFullYear());

  return {
    pathPrefix: "/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
