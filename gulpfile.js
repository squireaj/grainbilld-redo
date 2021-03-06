const gulp    = require('gulp')
		, prefix  = require('gulp-autoprefixer')
		, concat  = require('gulp-concat')
		, plumber = require('gulp-plumber')
		, sass    = require('gulp-sass')
		, uglify  = require('gulp-uglify')
		, watch   = require('gulp-watch')
		, rename  = require('gulp-rename')
		, paths   = {
	scss: [ 'public/app/styles/**/*.scss' ]
	, scripts: [
		'public/node_modules/jquery/dist/jquery.js'
		, 'public/node_modules/materialize-css/dist/js/materialize.js'
		, 'public/node_modules/fastclick/lib/fastclick.js'
		, 'public/node_modules/angular/angular.js'
			, 'public/node_modules/angular-sanitize/angular-sanitize.js'
		, 'public/node_modules/angular-ui-router/release/angular-ui-router.js'
		, 'public/node_modules/ng-infinite-scroll/build/ng-infinite-scroll.js'
		, 'public/node_modules/lodash/lodash.js'
		, 'public/app/**/*.js'
	]
};

gulp
		.task('scss', function() {
			return gulp.src('public/app/styles/main.scss')
					.pipe(sass({ outputStyle: 'compressed' })
							.on('error', sass.logError))
					.pipe(prefix())
					.pipe(gulp.dest('public/dist/styles'));
		})

		.task('minifyJS', function() {
			return gulp.src(paths.scripts)
					.pipe(plumber())
					.pipe(concat('scripts.min.js'))
					// .pipe(uglify())
					.pipe(gulp.dest('./public/dist/app'));
		})

		.task('watch', function() {
			gulp.watch(paths.scss, [ 'scss' ]);
			gulp.watch(paths.scripts, [ 'minifyJS' ]);
		})

		.task('default', [ 'scss', 'minifyJS', 'watch' ]);
