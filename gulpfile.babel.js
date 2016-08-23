import gulp from "gulp"
import utils from "gulp-util"
import server from "gulp-server-livereload"

import babel from "gulp-babel"
import include from "gulp-include"
import uglify from "gulp-uglify"

import pug from "gulp-pug"

import stylus from "gulp-stylus"
import sourcemaps from "gulp-sourcemaps"
import cssnano from "gulp-cssnano"
import autopref from "gulp-autoprefixer"
import svgSprites from "gulp-svg-sprite"

gulp.task('scripts', function(){
	return gulp
		.src("source/scripts/index.js")
		.pipe(include())
		.pipe(babel({presets: ['es2015', 'stage-0'], comments: true}))
		// .pipe(uglify())
		.pipe(gulp.dest("application/js/"))
})

gulp.task("stylus", function(){
	return gulp
		.src("source/styles/index.styl")
		.pipe(sourcemaps.init())
		.pipe(stylus({'include css': true}))
		.pipe(autopref())
		// .pipe(cssnano())
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("application/css/"))
})

gulp.task("pug", function(){
	return gulp
		.src("source/index.pug")
		.pipe(pug({pretty: true}))
		.pipe(include())
		.pipe(gulp.dest("application"))
})

let svg_config = {
	log: true,
	shape: {
		transform: ['svgo']
	},
	svg: {
		xmlDeclaration: false,
		doctypeDeclaration: false,
		namespaceIDs: false,
		dimensionAttributes: false
	},
	mode: {
		symbol: {}
	}
}

gulp.task("svg", function(){
	return gulp
		.src("source/static/images/*.svg")
		.pipe(svgSprites(svg_config))
		.pipe(gulp.dest("./tmp"))
})

gulp.task("copy:fonts", function(){
	return gulp
		.src("source/static/fonts/**/*.*")
		.pipe(gulp.dest("application/fonts/"))
})
gulp.task("copy:content", function(){
	return gulp
		.src("source/static/content/**/*.*")
		.pipe(gulp.dest("application/content/"))
})
gulp.task("copy:images", function(){
	return gulp
		.src(["source/static/images/**/*.*", "!source/static/images/**/*.svg"])
		.pipe(gulp.dest("application/images/"))
})

gulp.task("server", function(){
  return gulp.src("./application/")
  .pipe(server({livereload: true}))
})

gulp.task("watch", function(){
  gulp.watch("source/index.pug", gulp.parallel("pug"))
  gulp.watch("source/styles/**/*.styl", gulp.parallel("stylus"))
	gulp.watch("source/static/fonts/**/*.*", gulp.parallel("copy:fonts"))
	gulp.watch("source/static/content/**/*.*", gulp.parallel("copy:content"))
	gulp.watch("source/static/images/**/*.*", gulp.parallel("copy:images"))
	gulp.watch("source/scripts/**/*.*", gulp.parallel("scripts"))
})

gulp.task("copy", gulp.parallel(["copy:fonts", "copy:content", "copy:images"]))
gulp.task("build", gulp.parallel(["svg", "copy", "pug", "stylus", "scripts"]))
