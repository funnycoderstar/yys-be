# yys-be
阴阳师小助手后端

## 技术栈
nodejs + crawler + koa2 + mongoose

## Build Setup

``` bash
# 安装项目所需要的依赖
npm install

# 启动服务器
npm start

# 更新所有数据
npm run init

```
# (注：该项目数据库用的是mongoose, 需要安装mongodb及mongodb客户端)

```bash

# 安装
npm install mongodb

# 启动
mongod

```

##　目录结构

```
|-- [bin]                          
|   |-- init.js                     //更新数据库
|-- [crawler]                       //存放爬虫的目录
|-- [dist]                          //文件服务器根目录
|-- [public]                        //存放图片目录  
|-- [node_modules]                  //项目依赖
|-- [src]                           //源码
|   |-- [models]                    //资源文件
|   |-- [routers]                   //项目模块文件夹
|   |-- [tasks]                     //存储数据
|   |       |-- updateHeroDate.js   //更新式神数据
|   |-- [utils]                     
|   |       |-- imageDownloader.js  //下载图片
|   |-- app.js                      //服务器
|   |-- main.js                     //项目的入口
|-- .babelrc                        //babel配置
|-- .eslintrc.js                    //eslint rule 定义
|-- index.html                      //项目入口文件
|-- package.json                    //项目配置文件
|-- README.md                       //关于启动项目的命令和含义

```

## 免责声明
阴阳师小助手所有数据均来自于[18183](http://www.18183.com/yys/)。