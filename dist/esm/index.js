import * as fs from "fs";
export function extractHeadings(filePath) {
    var content = fs.readFileSync(filePath, "utf-8");
    var headings = [];
    // match the `#` syntax for headings
    var headingMatcher = /^(#+)\s(.+)$/gm;
    var match = headingMatcher.exec(content);
    while (match !== null) {
        var level = match[1].length;
        var title = match[2].trim();
        var slug = title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
        headings.push({ slug: slug, title: title, level: level });
        match = headingMatcher.exec(content);
    }
    return headings;
}
//# sourceMappingURL=index.js.map