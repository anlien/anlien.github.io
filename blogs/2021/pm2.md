npm run build:prod 编译压缩文件(会去除一切注释,console.log等非相关代码并压缩,静态资源地址为(//s(1-6).xinstatic.com/));
然后 pm2  start  app.js    --watch  --env:production
然后pm2 start ecosystem.config.js --env production --name myname即可