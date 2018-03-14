import yargs from 'yargs';

// 命令行参数,一个个option,argv表示以字符串形式解析命令行参数
const args = yargs
.option('production',{boolean:true,default:false,describe:'min all scripts'})
.option('watch',{boolean:true,default:false,descript:'watch all files'})
.option('verbose',{boolean:true,default:false,descript:'log all files '})
.option('sourcemaps',{descript:'force the creation of sourcemaps'})
.option('port',{string:true,default:8080,describe:'server port'})
.argv