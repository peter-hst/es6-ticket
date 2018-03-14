import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args';

// 页面处理任务
gulp.task('pages',() => {
	return gulp.src('app/**/*.ejs') //app目录下(**包含嵌套的目录)所有*.ejs文件
			.pipe(gulp.dest('server')) //把*.ejs复制到server目录
			.pipe(gulpif(args.watch,livereload()))
})