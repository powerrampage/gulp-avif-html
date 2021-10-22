# gulp-avif-html

> Gulp extension, replace html element `<img>` to `<picture>` with [`gulp-avif-html`](https://github.com/powerrampage/gulp-avif-html)

## Install

```
$ npm install gulp-avif-html --save-dev
```


## Usage

Use this into your `gulpfile.js`:

```js
const gulp = require('gulp')
const avifHTML = require("gulp-avif-html")

function html() {
    return src('source/*.html')
        .pipe(avifHTML())
        .pipe(gulp.dest('dist/'))
}

exports.html = html;
```

## Example

```html
// Input
<img src="img/image.jpg" alt="image">
```
```html
// Output
<picture>
    <source srcset="img/image.avif" type="image/avif" decoding="async" loading="lazy">
    <img src="img/image.jpg" alt="image">
</picture>
```

**Support file extensions:**  `.png, .jpg, .gif, .jpeg, .webp, .svg`

### Browser Support
At the time of writing, **AVIF has 64% support on browsers.** Google Chrome and Opera support it. Firefox will support it from June 2021. Safari doesn't yet have AVIF support. However, AVIF is an invention of the non-profit industry consortium Alliance for Open Media AOM. Major browser giants Apple, Mozilla and Google are all part of the project, so support can be expected relatively quickly.

### The picture element
For now, you can still use the format in it's almost complete glory with the native `<picture>` element in HTML. Why, you may ask? Well, the `<picture>` element allows progressive support. You can simply drop all image files in the order in which you want to load them. Your visitors' browsers load only one image at a time, which reduces the load on the server. Besides, you don't need a script to process multiple images.
Currently **96.5% of browsers support the** [`picture element`](https://caniuse.com/?search=picture)

✔ *Does not download more than one image at a time*

✔ *Native support for selecting the most appropriate image*

✔ *96% browser support and automatic fallback*

✔ *Getting this implemented is easy and straightforward*

### Lazy Loading and Async Decoding
You might have noticed the **loading="lazy"** and **decoding="async"** attributes in the code above. Those are relatively new options that are part of an ongoing effort to make the web faster. **decoding="async"** tells your browser it can try to parallelize loading your image. The **lazy loading attribute is supported by 75%** of all browsers.

### More information [`AVIF using HTML`](https://avif.io/blog/tutorials/html/)

### AVIF - is the latest image format that make smaller while preserves quality without loss.
<img src='https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60/v1598436712/sypu0bosisnrl1t1ko40.png' alt="AVIF - is the latest image format that make smaller while preserves quality without loss" />
