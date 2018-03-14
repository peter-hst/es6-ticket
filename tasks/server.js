import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server';
import args from './util/args';

gulp.task('serve',(cb) =>{
	if(!args.watch) return cb();
	var server = liveserver.new(['--harmony','server/bin/www']);
	server.start(); //启动web服务器

//监听文件是否发生变化,热刷新浏览器
	gulp.watch(['server/public/**/*.js','server/views/**/*.ejs'],function(file){
		server.notify.apply(server,[file]); //通知服务器,这个文件发生了变化
	})

	//需要重启服务的一些文件,例如路由发生了变化,就要重启服务器了
	gulp.watch(['server/routes/**/*.js','server/app.js'],function(){
		server.start.bind(server)()
	});
})