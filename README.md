<h1 align="center"># extract-md-headings</h1>

This package exports a function that you can use to "extract" &mdash; obviously &mdash; headings from any markdown file, with the `.md` or `.mdx` extensions.

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

## Examples

Take this package for a spin, and let me know what you've been able to build with it by contributing to the project.

Future examples will appear here.

## Contributing

See the [contributing guide](CONTRIBUTING.md)

## License

[MIT](LICENSE) © 2023 kaf-lamed-beyt
