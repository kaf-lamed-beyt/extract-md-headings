<h1 align="center">extract-md-headings</h1>

This package exports a function that you can use to "extract" headings from any markdown file, with the `.md` or `.mdx` extensions.

## Usage

To start using this package, you should install it from the npm registery with the command below, then you can proceed to use it in your project as you wish.

```bash
yarn add extract-md-headings
```

When you import the function and call it for the time, it returns an array of headings from your markdown file, and categorizes them based on the levels that they occupy in the file.

The function takes in one argument, which is the path to where your markdown file is located.

```js
import { extractHeadings } from "extract-md-headings";

const headings = extractHeadings("file.md");

console.log(headings);
```

If You have a makrdown file with headings, let's take this [article](https://meje.dev/blog/building-a-nextjs-preloader-the-right-way) for example, when you call the function on the markdown file of this article, it returns an array in the form below. When you take a look at the response, you'll see that it returns three properties &mdash; `slug`, `title`, and `level`

```js
[
  {
    slug: "not-every-code-snippet-you-see-on-twitter-is-accurate",
    title: "Not every code snippet you see on Twitter is accurate.",
    level: 3,
  },
  {
    slug: "listening-to-route-events-with-nextjs-userouter-hook",
    title: "Listening to route events with Next.js UseRouter hook",
    level: 3,
  },
  {
    slug: "making-the-loader-component-dynamic",
    title: "Making the loader component dynamic",
    level: 3,
  },
  { slug: "final-thoughts", title: "Final thoughts", level: 3 },
];
```

The essence of the `level` property is so you can utilize it when you are trying to create, say, a Table of Content component for your block and you want to group the headings in such a way that the lower heading titles become children of higher headins elements. This is to create more of a visual appeal BTW.

## Module resolution

The packages supports both ECMAScript &mdash; `esm` &mdash; and commonJS (`cjs`) modules. so if peradventure you try to use the package by doing the following, below, and you get this error: **"ReferenceError: exports is not defined in ES module scope"**

```js
import { extractHeadings } from "extract-md-headings";
```

One way to fix this would be to use this import statement instead of the one above

```js
import { extractHeadings } from "extract-md-headings/dist/esm";
```

And if you're coming from Next.js, you may want to use a module transpiler like `next-transpile-modules`. Install the package and modify `next.config.js` to look like this

```js
const withTM = require('next-transpile-modules')(['extract-md-headings']);

module.exports = withTM({
  ...
});
```

## Examples

Take this package for a spin, and let me know what you've been able to build with it by contributing to the project.

Future examples will appear here.

### With Next.js

These issue of module resolution can be avoided when you use the function in a Next.js app. Say you're trying to build a Table Of Content component, do not try using the function inside the component like the one below, and get the headings from `getStaticProps()`

```js
import React from "react";
import { extractHeadings } from "extract-md-headings";

const TableOfContents = ({ filePath }) => {
  const headings = extractHeadings(filePath);

  return (
    <div>
      <p>On this page</p>
      <ul>
        {headings.map(({ slug, title }, index) => {
          return (
            <li key={index}>
              <a href={`#${slug}`}>{title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TableOfContents;
```

When you do something like, this, Next.js would throw an error similar to the one below

```bash
TypeError: fs__WEBPACK_IMPORTED_MODULE_0___default(...).readFileSync is not a function
```

This is because `extract-md-headings` uses the `readFileSync` method from the [Node.js fs() module](https://nodejs.org/api/fs.html), and Next.js throws an error, because Node.js functions are mostly used for server-side operations.

In your case here, you're using the function in a client-side component. Hence, the error. To fix this, you modify `<TableOfContent />` to exclude the function's invocation, and use a `headings` prop, or anything you feel like using.

Then we'd have something like the snippet below;

```jsx
import React from "react";
import Head from "next/head";
import TableOfContents from "@components/TOC";
import { extractHeadings } from "extract-md-headings";

export default function Blog({
  post: {
    fileContent,
    frontmatter: { title },
  },
}) {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <TableOfContents headings={fileContent} />
    </React.Fragment>
  );
}

// destructuring params to get the unique slugs
export async function getStaticProps({ params }) {
  // fetch the particular file based on the slug,
  // and use the function to extract headings
  const { slug } = params;
  const mdxContent = extractHeadings(`./data/articles/${slug}.mdx`);

  return {
    props: {
      post: {
        frontmatter,
        source: mdxSource,
        fileContent: mdxContent,
      },
    },
  };
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md)

## License

[MIT](LICENSE) © 2023 kaf-lamed-beyt
