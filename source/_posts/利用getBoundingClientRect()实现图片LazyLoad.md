---
title: 利用getBoundingClientRect()实现图片LazyLoad
date: 2016-04-23 14:54:19
tags: ["JavaScript"]
categories: "笔记"
---
## 引言

在前端设计中，由于网页短时间内可提供的资源有限，尤其是移动端，为了让用户不必为了未知的页面内容等待太久，资源的有序加载是一种优化性能的手段，即只留下唯一的，不可替代的。

## 核心
### 方法：getBoundingClientRect
getBoundingClientRect()是Dom节点的方法，返回一个元素的大小及其相对于视口的位置,返回值是一个DOMRect对象。如图所示。


### 思想
当图片进入视窗之前，我们用一个小的图片替代它。当其进入视窗后，用它的备用`data-src`属性替换掉原来的`src`。

### 代码
我们需要遍历获取到的img元素，然后去判断它是否需要被加载。

```js
 function isLoad(el) {
    var top = el.getBoundingClientRect().top;
    return top>=0 && top<=window.innerHeight;
}
```
如果图片被加载了，则从数组中移除。

```js
function lazyLoad() {
    var m;
    for(m =0;m<images.length;m++){
        if(isLoad(images[m])){
            loadImage(images[m],function () {
                images.splice(m,m);
            });
        }
    }
}
```

其中的加载函数的核心，是`replaceChild(targetNode,node)`该方法将node节点替换掉原来的`targetNode`
## 完整代码
```js
(function(){
    var images = (function () {
        var o = document.querySelectorAll(".lazy-load");
        var len = o.length,p=[],n=0;
        for(;n<len;n++){
            p.push(o[n]);
        }
        return p;
    })();

    function isLoad(el) {
        var top = el.getBoundingClientRect().top;
        return top>=0 && top<=window.innerHeight;
    }


    function loadImage (el, callback) {
        var img = new Image()
                , src = el.getAttribute('data-src');
        img.onload = function() {
            if (!! el.parent){
                el.parent.replaceChild(img, el);
            }
            else{
                el.src = src;
            }
            callback? callback() : null;
        };
        img.src = src;
    }
    
    function lazyLoad() {
        var m;
        for(m =0;m<images.length;m++){
            if(isLoad(images[m])){
                loadImage(images[m],function () {
                    images.splice(m,m);
                });
            }
        }
    }
    lazyLoad();
    window.addEventListener("scroll",lazyLoad);
})();
```
## 联想
`getBoundingClientRect`还可用来做入场动画。当我们的前台展示页面的结构是如下的时候

```html
<section class="page">
	<!-- other structure -->
</section>	
<section class="page"></section>	
<section class="page"></section>	
<section class="page"></section>	
```
我们可以对`section`元素做视图判断，如果在视图内，则添加类似`on`的状态类，再在样式表内写入场动画效果类似

```css
.page.on{
	<!--any animation-->
	animation:
}
```
## 参考链接

1. [Element.getBoundingClientRect | MDN ](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)
2. [Lazy Loading Images | CSS-TRICK](https://css-tricks.com/snippets/javascript/lazy-loading-images/)