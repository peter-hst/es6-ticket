/*
npm install gulp gulp-if gulp-concat webpack webpack-stream vinyl-named vinyl-named gulp-livereload gulp-plumber gulp-rename gulp-uglify gulp-util yargs --save-dev
*/
import gulp from 'gulp';
import gulpif from 'gulp-if';
import concat from 'gulp-concat'; //文件拼接
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream'; //gulp是处理的文件流,所以要导入stream流
import named from 'vinyl-named'; //对文件名重命名的包
import livereload from 'gulp-livereload'; //文件修改后浏览器自动刷新,热更新
import plumber from 'gulp-plumber'; //处理文件信息流
import rename from 'gulp-rename'; //对文件名重命名的包
import uglify fromm 'gulp-uglify'; //对js压缩
import {log,colors} from 'gulp-util';//在命令行输出的一些工具包
import args from './util/args'; //命令行参数解析的工具

//创建gulp任务
gulp.task('scripts', ()=>{
	return gulp.src(['app/js/index.js'])
			.pipe(plumber({ 
				errorHandle: funcion(){//检查有问题抛出异常
					//无需实现, plumber自动处理
				}
			}))
			.pipe(named()) //重命名
			.pipe(gulpWebpack({ //编译文件
				module:{
					loaders:[{
						test:/.js$/,
						loader:'babel'
					}]
				}
			}),null,(err,stats) => {
				log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
					chunks:false
				}))
			})
			.pipe(gulp.dest('server/public/js')) //编译后的文件存放的位置
			.pipe(rename({ //复制一份 重命名为 cp.min.js
				basename:'cp',
				extname:'.min.js'
			}))
			.pipe(uglify({compress:{ //压缩
				properties:false
			},output:{'quote_keys':true}}))
			.pipe(gulp.dest('server/publc/js')) // 压缩后输出保存的位置
			.pipe(gulpif(args.watch,livereload())) //判断watch参数, 浏览器自动刷新
})