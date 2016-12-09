/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-minify-html gulp-load-plugins gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean --save-dev
 * imagemin 图片压缩
 * rubySass sass压缩
 * minifyCss css压缩
 * jshint js检查
 * uglify js压缩
 * minifyHtml  html压缩
 * rename 文件重命名
 * concat 文件合并
 * clean  清空文件夹
 * gulp-load-plugins  自动加载
 */


var gulp = require('gulp');

//加载gulp-load-plugins插件，并马上运行它
var plugins = require('gulp-load-plugins')();
//var sass = require("gulp-sass");

//默认的任务
/*gulp.task('default',function(){
    //进行文件监控，文件变动触发执行任务
    gulp.watch('staticDev/css/!*.css', ['pcCss']);
    gulp.watch('staticDev/demo/css/!*.css', ['telCss']);
    gulp.watch('staticDev/js/!*.js', ['pcJs']);
    gulp.watch('staticDev/demo/js/!*.js', ['telJs']);
    gulp.watch('staticDev/images/!*', ['pcImg']);
    gulp.watch('staticDev/demo/images/!*', ['telImg']);
});*/

gulp.task('default',['js','sass','img','concat']);


//sass压缩
gulp.task('sass', function () {
    var cssSrc = [	
    					'src/ypwHome/css/ypw/*.scss',
    					'src/*/css/*.scss'
    					],
        cssDst = './dist';
    return gulp.src(cssSrc,{base:'./src'}) //要压缩的文件
        .pipe(plugins.sass()) //
        .pipe(gulp.dest(cssDst));  //压缩后的文件路径
        
        
    
//  var cssDemoSrc = ['staticDev/demo/css/*.css','!staticDev/demo/css/*.min.css'],
//      cssDemoDst = './static-dev/demo/css/';
//  gulp.src(cssDemoSrc) //要压缩的文件
//      .pipe(plugins.concat('main.css'))//合并文件，文件名为main.css
//      .pipe(plugins.minifyCss()) //压缩
//      .pipe(plugins.rename({ suffix: '.min' }))  //改字，加上min标志
//      .pipe(gulp.dest(cssDemoDst));  //压缩后的文件路径
});

//img压缩
gulp.task('img', function () {
    var imgSrc = ['src/ypwHome/images/ypw/*', 'src/*/img/*'],
        imgDst = './dist';
    gulp.src(imgSrc,{base:'./src'})
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(imgDst));
//
//  var imgDemoSrc = 'staticDev/demo/images/*',
//      imgDemoDst = 'static-dev/demo/images/';
//  gulp.src(imgDemoSrc)
//      .pipe(plugins.imagemin())
//      .pipe(gulp.dest(imgDemoDst));
});
var amdOptimize = require("amd-optimize");
//JS压缩
gulp.task('js', function () {
    var jsSrc = ['src/common/js/*.js','src/ypwHome/js/ypw/*.js'],
    	 jsDst = 'dist';
    gulp.src(jsSrc,{base: './src'})
//      .pipe(plugins.uglify())
        .pipe(gulp.dest(jsDst));
	gulp.src("src/require/js/*.js",{base: './src'})
		.pipe(amdOptimize("app"))   //主入口文件
	    .pipe(plugins.concat("result.js"))  //合并后文件
	    .pipe(gulp.dest("dist"));  //输出目录
//  var jsDemoSrc = ['src/common/js/*.js','!src/common/js/*.min.js'],
//  var jsLibSrc = ['src/common/js/*.js'],
//      jsLibDst = 'dist';
//  gulp.src(jsLibSrc,{base:'/src'})
//      .pipe(plugins.concat('lib.js'))
//      .pipe(plugins.uglify())
//      .pipe(plugins.rename({ suffix: '.min' }))
//      .pipe(gulp.dest(jsLibDst));
});
 gulp.task('concat',function() {
 	var htmlSrc = "src/ypwHome/*.html",
 		htmlDst = "./dist"
 
    gulp.src(htmlSrc,{base:'./src'})
        .pipe(plugins.contentIncluder({
            includerReg:/<!\-\-include\s+"([^"]+)"\-\->/g,
            deepConcat: true,
            baseSrc: './'
        }))
        .pipe(gulp.dest(htmlDst));
});



gulp.task("clean",function(){
	return gulp.src("dist")
	.pipe(plugins.clean());
});
gulp.task('default', ['clean'], function(){
    gulp.start('js', 'sass','img','concat');
});

// Watch
gulp.task('watch', function() {

  	// Watch .scss files
  	var watcher = gulp.watch([
  		'src/common/js/*.js',
  		'src/ypwHome/js/ypw/*.js',
  		'src/ypwHome/css/ypw/*.scss',
  		'src/*/css/*.scss',
  		'src/ypwHome/*.html'
  		]);
	watcher.on('change', function(event) {
		gulp.start('js', 'sass','concat');
	});
  // Watch .js files
//gulp.watch('/js/**/*.js', ['js']);

  // Watch image files

  // Create LiveReload server
//plugins.livereload.listen();
//
//// Watch any files in dist/, reload on change
//gulp.watch(['dist/**']).on('change', plugins.livereload.changed);

});

