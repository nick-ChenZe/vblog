---
title: AngularJS入门笔记（一） 
date: 2016-01-29 21:52:19
tags: ["AngularJS"]
categories: "笔记"
thumbnail: http://7xt64w.com2.z0.glb.clouddn.com/owl-158414_1280.png
---

这周末开始，到年假过完，准备把angular1.4+版本和beta2版本先爬个坑，至于为什么嘛？当然是为了找工作了。然后还要抽点时间学点图像处理的算法和webGL，天啦噜的，我觉得自己真是太Native居然认为这任务做的完？废话到这里了，开始吧！
 <!--more-->


## 环境配置

因为自己想从简单的坑一点点踩过来所有没有安装官方的依赖包，只装了简单的主文件

```bash
npm install angular@1.4.9
```
如果喜欢搭建完整应用的话，可以安装json中的依赖来安装

```json
{
  "name": "angularjs",
  "license": "MIT",
  "branchVersion": "^1.5.0-beta.2",
  "branchPattern": "1.5.*",
  "distTag": "beta",
  "repository": {
    "type": "git",
    "url": "https://github.com/angular/angular.js.git"
  },
  "engines": {
    "node": "<5",
    "npm": "~2.5"
  },
  "engineStrict": true,
  "scripts": {
    "preinstall": "node scripts/npm/check-node-modules.js --purge",
    "postinstall": "node scripts/npm/copy-npm-shrinkwrap.js",
    "commit": "git-cz",
    "test-i18n": "jasmine-node i18n/spec"
  },
  "devDependencies": {
    "angular-benchpress": "0.x.x",
    "benchmark": "1.x.x",
    "bower": "~1.3.9",
    "browserstacktunnel-wrapper": "~1.3.1",
    "canonical-path": "0.0.2",
    "cheerio": "^0.17.0",
    "commitizen": "^2.3.0",
    "cz-conventional-changelog": "1.1.4",
    "dgeni": "^0.4.0",
    "dgeni-packages": "^0.11.0",
    "event-stream": "~3.1.0",
    "glob": "^6.0.1",
    "grunt": "~0.4.2",
    "grunt-bump": "~0.0.13",
    "grunt-contrib-clean": "~0.6.0",
    "grunt-contrib-compress": "~0.12.0",
    "grunt-contrib-connect": "~0.8.0",
    "grunt-contrib-copy": "~0.6.0",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-ddescribe-iit": "~0.0.1",
    "grunt-jasmine-node": "git://github.com/vojtajina/grunt-jasmine-node.git#fix-grunt-exit-code",
    "grunt-jscs": "^2.1.0",
    "grunt-merge-conflict": "~0.0.1",
    "grunt-shell": "~1.1.1",
    "gulp": "~3.8.0",
    "gulp-concat": "^2.4.1",
    "gulp-foreach": "0.0.1",
    "gulp-jshint": "~1.4.2",
    "gulp-rename": "^1.2.0",
    "gulp-sourcemaps": "^1.2.2",
    "gulp-uglify": "^1.0.1",
    "gulp-util": "^3.0.1",
    "jasmine-node": "^2.0.0",
    "jasmine-reporters": "~1.0.1",
    "jshint-stylish": "~1.0.0",
    "karma": "^0.13.19",
    "karma-browserstack-launcher": "^0.1.8",
    "karma-chrome-launcher": "^0.2.2",
    "karma-firefox-launcher": "^0.1.7",
    "karma-jasmine": "^0.1.6",
    "karma-junit-reporter": "^0.3.8",
    "karma-ng-scenario": "^0.1.0",
    "karma-sauce-launcher": "^0.3.0",
    "karma-script-launcher": "^0.1.0",
    "load-grunt-tasks": "~0.6.0",
    "lodash": "~2.4.1",
    "marked": "~0.3.0",
    "node-html-encoder": "0.0.2",
    "promises-aplus-tests": "~2.1.0",
    "protractor": "^2.1.0",
    "q": "~1.0.0",
    "q-io": "^1.10.9",
    "qq": "^0.3.5",
    "rewire": "~2.1.0",
    "semver": "~4.0.3",
    "shelljs": "~0.3.0",
    "sorted-object": "^1.0.0",
    "stringmap": "^0.2.2"
  },
  "licenses": [
    {
      "type": "MIT",
      "url": "https://github.com/angular/angular.js/blob/master/LICENSE"
    }
  ],
  "dependencies": {},
  "config": {
    "commitizen": {
      "path": "node_modules/cz-conventional-changelog"
    }
  }
}
```
```bash
grunt package
```
好处是连单元测试也可以一并使用
AngularJS1.4+版本中，一些注入是被分开来的，如果需要可以单独下载[入口](https://code.angularjs.org/1.5.0-rc.2/)

官方入门课程总共安排来11步，即step11。我发现我全部做完总共有6个目录，所以我就分6块做笔记吧。

## Step1: 理解AngularJS

Angular是当下最为人称道的MVW（Model-View－Whatever）框架，听到耳朵都起茧的`双向数据绑定`。单向绑定即model层的数据表现到表现层，而双向数据绑定将在把view层产生的输入
绑定的model层，即模版。Angular里的脏检测（$digest）来监视一些事件，在这些事件更新数据时，同时更新model层和view层。

```html
<div ng-app="app">
    <div ng-controller="firstController">
        <input type="text" ng-model="name" placeholder="Enter a name here">
        <input type="text" ng-model="age" placeholder="Enter a name here">
        {{name}}
        {{age}}
    </div>
</div>
<script type="text/javascript" src="../node_modules/angular/angular.js"></script>
<script type="text/javascript" src="js/app.js"></script>
```

```js
angular.module("app",[]).
  controller("firstController",["$scope", function ($scope) {
    $scope.name = 1;
    $scope.age = 2;
}]);
```
我们在`div`标签里添加了`ng-app`这个属性来告诉angular应该监视哪块区域，踩坑中发现1.4+版本希望 `ng-app`值不为空，不然webstorm会出告警。
`angular.module(name, [requires], [configFn]);`
`name`：模块名次
`require`：模块依赖，字符串或数组
`config`：模块配置

因为angular是全局变量，在其它函数避免定义，造成污染

`module().controller`
angular中的控制器，可以理解成帮助模块管理视图模版的工具。大部分一个控制器会对应一个代码片段。
`module.controller(name, [[],function($di){}]);`
`name`：控制器名字
第二个参数是一个数组，函数前为控制器的依赖注入，常见的$http,$scope等类型都是字符串，函数参数要将这些依赖传入。
Angular每个控制器对应一个$scope，$scope会继承父级$scope但是因为javascipt原型链调用远离，子$scope会覆盖父$scope的原有属性。










