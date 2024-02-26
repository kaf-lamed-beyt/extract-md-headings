import path from "path";
import { expect, test } from "@jest/globals";
import { extractHeadings } from "..";

const sampleMdPath = path.join(__dirname, "sample.md");

test("should correctly extract all headings from the .md file", () => {
  const result = extractHeadings(sampleMdPath);
  const titles = result.map((h) => h.title);

  expect(titles).toEqual([
    "Sample Markdown file to use for testing",
    "Level 2 heading",
    "Level 3 heading",
    "Level 4 heading",
    "Level 3 heading (2)",
    "Level 5 heading",
    "Level 2 heading",
    "Level 6 heading",
  ]);
});

test("should produce correct slugs for the headings", () => {
  const result = extractHeadings(sampleMdPath);
  const slugs = result.map((h) => h.slug);

  expect(slugs).toEqual([
    "sample-markdown-file-to-use-for-testing",
    "level-2-heading",
    "level-3-heading",
    "level-4-heading",
    "level-3-heading-2",
    "level-5-heading",
    "level-2-heading",
    "level-6-heading",
  ]);
});

test("should produce correct levels for the headings", () => {
  const result = extractHeadings(sampleMdPath);
  const slugs = result.map((h) => h.level);

  expect(slugs).toEqual([1, 2, 3, 4, 3, 5, 2, 6]);
});

test("should correctly use the custom slugFn, if provided", () => {
  const result = extractHeadings(sampleMdPath, {
    slugFn: (title) => title.replace(/\s/g, "_"),
  });

  const slugs = result.map((h) => h.slug);

  expect(slugs).toEqual([
    "Sample_Markdown_file_to_use_for_testing",
    "Level_2_heading",
    "Level_3_heading",
    "Level_4_heading",
    "Level_3_heading_(2)",
    "Level_5_heading",
    "Level_2_heading",
    "Level_6_heading",
  ]);
});
