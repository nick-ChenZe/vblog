---
title: 利用css的attr属性制作小tips
date: 2016-04-23 14:26:19
tags: ["CSS"]
categories: "笔记"
thumbnail: http://7xt64w.com2.z0.glb.clouddn.com/owl-158414_1280.png
---
`attr()`是CSS3中的计算属性，类似于`calc()`,还有`toggle()`。现在浏览器支持在content属性中使用`attr()`。想像下，如果可以在`margin`里室友这个属性，在`html`标签内写类似`data-marginLeft:"20px"`，是不是很像传说中的原子类，和相比写在CSS中有什么优点呢？见仁见智，这篇笔记主要记录如何用`attr()`属性制作类似对话框的小tips。
 <!--more-->
![小tips注解](http://7xt64w.com2.z0.glb.clouddn.com/sh.gif)
当然你也可以添加相应的`transition`效果，让它看起来更友善。
[参考链接](https://www.w3.org/TR/css3-values/#funcdef-attr)

>语法: attr( attribute-name < type-or-unit >? [, < fallback > ]? )

`attr()`接受三个参数，第一个是传入的属性名称，第二是解析的类型或单位，第三个是回退的值，如果解析出错，`content`值会被计算成第三个参数，如果不存在，则为空。但是，`fallback`的值必须和第二参数指定的类型或参数一致，否则会使用默认值（不同类型的默认值不同，基本上为0或空）。

在标签里除了要设置获取的`data`属性，还需要设置类或id让CSS取识别它。当然和样式相关的，最好避免使用id。最后如果要防止中文硬编码带来的问题，可以在js中传入属性，将`data-tips-type`设成变量。

```html
<button class="custom-tips" data-tips="this is a small tips!">pop up</button>
```

我不喜欢在CSS中使用`opacity`属性。该隐藏的，就不要让它加载，还能提升性能（当然程度可以忽略不计）。

```css
.custom-tips{
    position: relative;  
}
.custom-tips:hover:after,
.custom-tips:hover:before{
    opacity: 1;
}
.custom-tips:before{
    opacity: 0;
    content: attr(data-tips) " ";
    background-color: rgba(0,0,0,0.9);
    white-space: nowrap;
    position: absolute;
    bottom: 100%;
    left: 50%;
    border-radius: 4px;
    font-size: 12px;
    padding: .5em 1em;
    margin-bottom: 20px;
    pointer-events: none;
    transition: all 0.4s ease-out;
    transform: translate(-50%, 10px);
    transform-origin: top;
}

```
![简单的例子](http://7xt64w.com2.z0.glb.clouddn.com/sh1.gif)

为了伪类能够更好的定位，父元素`position`属性最好是`relative`，否则就会很尴尬。`transform: translate(-50%, 10px);`配合`left: 50%;`是一个不错的水平居中的办法。

最后我们加上三角形，使得整体更完整，你可以使用SVG或者base64的小图片，这里为了方便，我直接用border实现。完整代码如下：

```css
.custom-tips{
    position: relative;
}
.custom-tips:hover:after,
.custom-tips:hover:before{
    opacity: 1;
}
.custom-tips:before,
.custom-tips:after{
    opacity: 0;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transition: all 0.4s ease-out;
    transform: translate(-50%);
    transform-origin: top;
}
.custom-tips:before{
    content: attr(data-tips) " ";
    background-color: rgba(0,0,0,0.9);
    white-space: nowrap;
    border-radius: 4px;
    font-size: 12px;
    padding: .5em 1em;
    margin-bottom: 10px;
}
.custom-tips:after{
    content: '';
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-top: 6px solid rgba(0,0,0,0.9);
    margin-bottom: -2px;

}
```

![最后实现结果](http://7xt64w.com2.z0.glb.clouddn.com/sh2.gif)

>因为伪类唯一，所以如果目标元素已经存在`:before`或者`:afer`伪类，则会发生冲突。同样的，还有不适用伪类的元素入`< hr >`等。

最后本文灵感与[balloon.css](http://kazzkiq.github.io/balloon.css/)相同，大家有兴趣，可以试下这个。

