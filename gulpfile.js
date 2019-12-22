/* eslint-disable no-undef */
const gulp = require("gulp");
const watch = require("gulp-watch");
const babel = require("gulp-babel");
const entry = "./src/server/**/*.js";
const configEntry = "./src/server/config/index.js";
const rollup = require('gulp-rollup');
const replace = require("rollup-plugin-replace");
const eslint = require('gulp-eslint');
//开发环境
function buildDev() {
    return watch(entry, { ignoreInitial: false }, function () {
        gulp.src(entry).pipe(babel({
            "babelrc": false,
            "plugins": [
                ["@babel/plugin-proposal-decorators", {
                    legacy: true
                }],
                "@babel/plugin-transform-modules-commonjs"
            ]
        }))
            .pipe(gulp.dest('dist'));
    })
}
//上线环境
function buildProd() {
    return gulp.src(entry).pipe(babel({
        "babelrc": false,
        ignore: [configEntry],
        "plugins": [
            ["@babel/plugin-proposal-decorators", {
                legacy: true
            }],
            "@babel/plugin-transform-modules-commonjs"
        ]
    }))
        .pipe(gulp.dest('dist'));
}
function buildConfig() {
    return gulp.src(entry)
        .pipe(rollup({
            input: configEntry,
            output: {
                format: "cjs"
            },
            plugins: [
                replace({
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('./dist'));
}
function buildLint() {
    return gulp.src([entry])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

let build = gulp.series(buildDev);
if (process.env.NODE_ENV == "production") {
    build = gulp.series(buildProd, buildConfig);
}
if (process.env.NODE_ENV == "lint") {
    build = gulp.series(buildLint);
}
gulp.task("default", build);