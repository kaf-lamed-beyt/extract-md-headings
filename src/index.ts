import * as fs from "fs"

interface Heading {
  slug: string;
  title: string;
  level: number;
}

export function extractHeadings(filePath: string): Array<Heading> {
    const content = fs.readFileSync(filePath, "utf-8")
    const headings: Array<Heading> = [];

  // match the `#` syntax for headings
  const headingMatcher = /^(#+)\s(.+)$/gm;

  let match = headingMatcher.exec(content);
  while (match !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({ slug, title, level });
    match = headingMatcher.exec(content);
  }

  return headings;
}
