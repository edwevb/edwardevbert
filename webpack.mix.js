let mix = require("laravel-mix");

mix
  .js("src/js/min.js", "public/assets/js")
  .sass("src/sass/min.scss", "assets/css")
  .setPublicPath("public");
