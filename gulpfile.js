var gulp = require("gulp");
var ts = require("gulp-typescript");
var fs = require("fs-extra");
var mocha = require("gulp-mocha");
var runSequence = require("run-sequence");

var paths = {
  dist: "dist",
  tsSources: "src/**/*.ts",
  tests: "dist/test/*.js"
};

// compile typescripts
function build() {
  if (fs.existsSync(paths.dist)) {
    fs.emptyDirSync(paths.dist);
  }

  return gulp
    .src(paths.tsSources)
    .pipe(
      ts({
        noImplicitAny: false,
        target: "ES2015",
        sourceMap: true,
        module: "CommonJS",
        baseUrl: ".",
        paths: {
          "*": ["node_modules/*", "src/types/*"]
        }
      })
    )
    .pipe(gulp.dest(paths.dist));
}

function test() {
  return gulp.src([paths.tests], { read: false }).pipe(
    mocha({
      reporter: "spec",
      exit: true
    })
  );
}

gulp.watch(paths.tsSources, gulp.series(build, test));

exports.test = gulp.series(build, test);
exports.build = gulp.series(build);

exports.default = gulp.series(build, test);
