interface Heading {
    slug: string;
    title: string;
    level: number;
}
export declare function extractHeadings(filePath: string): Array<Heading>;
export {};
