#制定node镜像的版本
FROM node:8.9-alpine
#移动当前目录下面的文件到app目录下
COPY . /app/
#进入到app目录下面，类似cd
WORKDIR /app
#安装依赖
RUN npm install
#对外暴露的端口
EXPOSE 4000
#程序启动脚本