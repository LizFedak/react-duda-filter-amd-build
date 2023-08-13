# About
This is a React application that utilizes the AMD (Asynchronous Module Definition) module format for organizing and loading its components and code. This was made for a Duda widget builder context, so users connect their data and attributes from the Duda widget builder.

## Why AMD?

AMD is a module format that focuses on asynchronous loading of JavaScript modules, which can be beneficial in certain scenarios. While AMD is less common in modern React applications, there may be specific use cases where it aligns well with your project's requirements.

This was the specific format recommended for Duda's experimental React widget option, so I selected that. This particular branch takes in a list of 'filters' and a list of 'data items' and outputs a filter view.

Config files added/modified:

- .babelrc
- .postcss.config.js
- tailwind.config.js
- webpack.config.js

## Important Notes
The example React app uses AMD (Asynchronous Module Definition) with Webpack for module loading and bundling.
Please note that this app is intended for testing and exploration purposes only. It is not meant for personal or business use beyond developer testing.

If you encounter any issues or have questions, feel free to reach out to us at liz@lizfedak.com.

Before you begin, make sure you have the following installed on your system:

- Node.js (version 12 or higher)
- npm

Configure:
```js
npm install
```

Build:
```js
npm run build
```


## Duda Widget Builder Settings

In the Duda widget builder, configure these settings.

In the Content tab, add these options:

![Content tab](https://irp.cdn-website.com/530aeed4/files/uploaded/filtersImage.jpg)

In the JavaScript tab, configure your widget as:

![JavaScript VIEW](https://irp.cdn-website.com/530aeed4/files/uploaded/javascript.jpg)
```js
var scriptSrc = 'https://irp.cdn-website.com/530aeed4/files/uploaded/bundle22.js';
api.scripts.renderExternalApp(scriptSrc, element, {
  list: data.config.listItems,
  filters: data.config.filters
});
```
Replace `'https://irp.cdn-website.com/530aeed4/files/uploaded/bundle22.js'` with your bundle.js source file.

In the HTML tab, configure your HTML as:

![HTML view](https://irp.cdn-website.com/530aeed4/files/uploaded/html.jpg)

```html
<div id="root"></div>
```