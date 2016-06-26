---
title: AngularJS入门笔记（三）
date: 2016-02-28 21:52:19
tags: ["AngularJS"]
categories: "笔记"
thumbnail: http://7xt64w.com2.z0.glb.clouddn.com/owl-158414_1280.png
---

## 没关系的引导语
动态语言和静态语言的区别？

>Static typing when possible, dynamic typing when needed。

动态类型语言：动态类型语言是指在运行期间才去做数据类型检查的语言，也就是说，在用动态类型的语言编程时，永远也不用给任何变量指定数据类型，该语言会在你第一次赋值给变量时，在内部将数据类型记录下来。Python和Ruby就是一种典型的动态类型语言，其他的各种脚本语言如VBScript也多少属于动态类型语言。

静态类型语言：静态类型语言与动态类型语言刚好相反，它的数据类型是在编译其间检查的，也就是说在写程序时要声明所有变量的数据类型，C/C++是静态类型语言的典型代表，其他的静态类型语言还有C#、JAVA等
 <!--more-->


[链接](https://docs.angularjs.org/api/ng/directive/ngApp)

## 动态加载数据 

AngularJS可以通过`.get()`方法，做类似jQuery的ajax操作，在使用前，需要依赖注入`$http`服务。

```js
function myController($scope,$http) {

    $http.get('data.json').success(function(data) {
        $scope.apples = data.result;
    });

    $scope.orderProp = 'num';

}
```

## 路由管理

AngularJS可以自定义路由来达到应用式的跳转，在更换页面是无需再做必要的加载。我们需要在模块里注入`ngRoute`依赖。

```html
<div ng-view></div>
```

AngularJS会根据地址更换ngView中的内容，同时需要引入从AngularJS中分离出来的的路由模块

```js
myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/apples', {
            templateUrl: 'list.html',
            controller: 'myController'
        }).
        when('/apples/:appleid', {
            templateUrl: 'detail.html',
            controller: 'detail'
        }).
        otherwise({
            redirectTo: '/apples'
        });
}]);
```
在上面这段配置代码中，`$routeProvider`提供路由服务，而后面的`/apples`和`/apples/:appleid`则是具体的路由地址，默认情况下我们会跳转了`/apples`映射到`list.html`上，而`appleid`则会映射到具体信息的页面，appleid也成为了信息检索的唯一参数，如果没有这个参数，我们可能就需要一些特别的判断去告诉浏览器，这个页面我们需要展示什么东西。

```js
controllers.controller('detail',['$scope','$routeParams',function($scope,$routeParams){
	$scope.num = $routeParams.appleid;
}]);
```
在控制器里我们通过`$routeParams`讲路由中的区分参数绑定到当前作用域中的`num`上，接着你可以通过这个`num`去展示任务与其相关的内容了。

```html
<script type="text/javascript" src="../node_modules/angular/angular-route.min.js"></script>
```
## 通过事件更新视图

我们整个结构都是去更新Model层的数据，从而反应到View层上来，所以在某个元素上绑定一个点击事件，更改图片的`src`，那么结果就是展示的图片会因点击元素的不同而不同。

```js
$scope.clickHandler = function (url) {
		$scope.imgUrl = url;
	};
```
```html
<img ng-src={{imgUrl}}>
<img ng-src={{apple.url}} ng-click="clickHandler(apple.url)">
```
下面的`img`元素会通过其`ngClick`事件，将自身的`src`传给上面的`img`的引用超链接，结果就会如下面的图片那样

![1](../../../img/1.gif)

## 自定义过滤器

我们通常希望从一些复杂的信息中提取我们需要的内容，在进行判断。

```js
filters.filter('check',function(){
	'use strict';
	return function (input) {
		return input > 200 ? '\u2713' : '\u2718';
	}
});
```

`check`命名了一个自定义过滤器的值，通过函数对接收到的值做处理，最后`return`想要展示的内容。过滤器可以向之前那样绑定

```html
<span>{{applelist.id | check}}</span>
```