---
title: AngularJS入门笔记（二）
date: 2016-02-01 20:52:10
tags: ["AngularJS"]
categories: "笔记"
thumbnail: http://7xt64w.com2.z0.glb.clouddn.com/owl-158414_1280.png
---

## 没关系的引导语
为什么是ngApp而不是ngModule？

>Use this directive to auto-bootstrap an AngularJS application. The ngApp directive designates the root element of the application and is typically placed near the root element of the page - e.g. on the or tags.
用这个指令去自动引导一个AngularJS应用。`ngApp`这个指令经常会被放在页面根元素附近，用来划定应用根元素的作用范围，例如`html`？
>Only one AngularJS application can be auto-bootstrapped per HTML document. The first ngApp found in the document will be used to define the root element to auto-bootstrap as an application. To run multiple applications in an HTML document you must manually bootstrap them using angular.bootstrap instead. AngularJS applications cannot be nested within each other.
只有一个AngularJS应用能够用来引导每个HTML文档。在文档中发现的第一个`ngApp` 被用来定义一个作为应用程序边界的根元素。如果你想要在一个HTML中运行多个应用程序就必须手动引导它们去使用`Angular.bootstrap`来代替`ngaApp`的作用。AngularJS应用们不能互相嵌套。
 <!--more-->


[链接](https://docs.angularjs.org/api/ng/directive/ngApp)

## Step2

### 循环输出
使用过其他模版机制，所以对这个比较熟悉。
```html
<ul>
  <li ng-repeat="apple in apples | filter:query | orderBy: orderProp">
		<span>{{apple.id}}</span>
		<span>{{apple.num}}</span>
	</li>
</ul>
```
`apples`即为需要循环的数组，而`apple`是你自己定义的循环中的子集，它的意义是统筹数组中每个对象的属性。

### 筛选过滤
`｜`管道符号分隔过滤器，AngularJS自带下列的过滤功能，你也可以自己定义（下次再记）

```js
  register('currency', currencyFilter);
  register('date', dateFilter);
  register('filter', filterFilter);
  register('json', jsonFilter);
  register('limitTo', limitToFilter);
  register('lowercase', lowercaseFilter);
  register('number', numberFilter);
  register('orderBy', orderByFilter);
  register('uppercase', uppercaseFilter);
```
这里我们只用到了`query`和`orderBy`，前者是查询过滤即你可以绑定过查询输入框，像这样

```html
<input type="text" ng-model="query">
```

后者是排序你可以以任意方式给其传递关键词

```html
<select ng-model="orderProp">
	<option value="id">id</option>
	<option value="num">num</option>
</select>
```


