import fs from "fs";

interface Heading {
  id: number;
  slug: string;
  title: string;
  level: number;
}

/**
 * @description gets all the heading-text from a markdown file
 * @param {string} filePath  a valid relative path, as a string to where the markdown file is located.
 * @returns an array of objects containing the heading information like the `id`, `title`, `slug`, and `level`
 * @see [Documentation](https://github.com/kaf-lamed-beyt/extract-md-headings#usage)
 */

export function extractHeadings(filePath: string): Array<Heading> {
  const content = fs.readFileSync(filePath, "utf-8");
  const headings: Array<Heading> = [];

  // match the `#` syntax for headings
  const headingMatcher = /^(#+)\s(.+)$/gm;

  let match = headingMatcher.exec(content);
  while (match !== null) {
    const id = Math.floor(Math.random() * 900000) + 100000;
    const level = match[1].length;
    const title = match[2].trim();
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({ id, slug, title, level });
    match = headingMatcher.exec(content);
  }

  return headings;
}
