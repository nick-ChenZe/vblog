# <img src="./logo.png" width="60px" height="60px" />Vblog（Developing）

A spa blog without any database based on Vue.js

## Usage
```js
npm run generate //generate data file
npm run dev      // start hot loader on localhost:8080
npm run build    // buill bundle file
```
## Directory
```
.
├── LICENSE
├── README
├── README.md
├── _config.yml     //TODO To config the file path
├── api             //List for JSON file that FE can request
├── build.js        //Generate the JSON file
├── dist            //Output folder for bundle Javascript file
├── favicon.ico     //logo
├── index.html      //re render from index template
├── lib             //for some front Javascript library
├── node_modules 
├── package.json   
├── photo           //Folder for photo ,minify file is in api folder
│   ├── photo.yml   //Yaml for photo list,see the template
├── post			//Folder for markdown,input entry
├── src             //For Vue compontents
└── webpack.config.js
```
## 中文

Vblog是一个以Vuejs为基础的博客的框架，用nodeJs将所有Markdown文件转化为可用的JSON数据，在前台进行展示，它的优点

- 利用Webpack，可以很轻松的进行调试
- 无须担忧资源打包问题
- 非常强的定制性，能完成大部分的需求
- 单页面内部跳转无须重复加载资源

## English

1. We use Webpack, so it's easy to debug or redesign for you local enviroment.
2. Don't need to worring about packageing resources.
3. For its customizability, Vblog can meet most of your demands.
3. Comparing to static pages,SPA has advantage on source loading.

## Exampele post

```Markdown
//Add yaml letter in the head then you can get object in the FE
---
title: test post
tags: [tag,tag2,tag3]
categories: test
date: 2016-07-20 22:20:00
cover: 
isTop: true
---

Your Markdown words

```
##TODO


- [ ] searching
- [x] <sup>comment box style</sup>
- [x] <sup>rewrite node process to promise</sup>
- [x] <sup>404 error design</sup>
- [x] <sup>post page design</sup>
- [x] <sup>abstract vue compontents to compontents and viewsn</sup>

## LICENSE
Copyright (c) 2015 nick-ChenZe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
