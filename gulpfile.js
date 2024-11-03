const del = require("del");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const scss = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const { src, dest, watch, parallel, series } = require("gulp");

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "src/",
    },
  });
}

function cleanDist() {
  return del("dist");
}

function images() {
  return src("src/images/**/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist/images"));
}

function scripts() {
  return src([
    "node_modules/jquery/dist/jquery.js",
    "node_modules/slick-carousel/slick/slick.js",
    "node_modules/mixitup/dist/mixitup.js",
    "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js",
    "src/js/script.js",
  ])
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(dest("src/js"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("src/scss/style.scss")
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 version"],
        grid: true,
      })
    )
    .pipe(dest("src/css"))
    .pipe(browserSync.stream());
}

function build() {
  return src(
    [
      "src/css/style.min.css",
      "src/fonts/**/*",
      "src/js/script.min.js",
      "src/*.html",
    ],
    { base: "src" }
  ).pipe(dest("dist"));
}

function watching() {
  watch(["src/scss/**/*.scss"], styles);
  watch(["src/js/**/*.js", "!src/js/script.min.js"], scripts);
  watch(["src/*.html"]).on("change", browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watching = watching;
exports.cleanDist = cleanDist;
exports.browsersync = browsersync;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);
