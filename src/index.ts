import fs from "fs";

interface Heading {
  id: number;
  slug: string;
  title: string;
  level: number;
}

export interface ExtractHeadingsOptions {
  slugFn?: (title: string) => string;
}

/**
 * @typedef ExtractHeadingsOptions
 * @type {object}
 * @property {function} slugFn - a function to convert the heading title to a slug, if you wish to override the default slug generation algorithm
 *
 * @description gets all the heading-text from a markdown file
 * @param {string} filePath  a valid relative path, as a string to where the markdown file is located.
 * @param {ExtractHeadingsOptions} options an optional configuration object to customize the behaviour of the function
 * @returns an array of objects containing the heading information like the `id`, `title`, `slug`, and `level`
 * @see [Documentation](https://github.com/kaf-lamed-beyt/extract-md-headings#usage)
 */

export function extractHeadings(
  filePath: string,
  options?: ExtractHeadingsOptions
): Array<Heading> {
  const content = fs.readFileSync(filePath, "utf-8");
  const headings: Array<Heading> = [];

  // match the `#` syntax for headings
  const headingMatcher = /^(#+)\s(.+)$/gm;

  let match = headingMatcher.exec(content);
  while (match !== null) {
    const id = Math.floor(Math.random() * 900000) + 100000;
    const level = match[1].length;
    const title = match[2].trim();
    const slugFn = options?.slugFn ?? defaultSlugFn;
    const slug = slugFn(title);

    headings.push({ id, slug, title, level });
    match = headingMatcher.exec(content);
  }

  return headings;
}

const defaultSlugFn = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};
