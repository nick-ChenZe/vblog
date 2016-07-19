---
title: css3中的滤镜
date: 2016-04-15 20:14:12
tags: 
categories: "笔记"
thumbnail: http://7xt64w.com2.z0.glb.clouddn.com/owl-158414_1280.png
---
## filter样式
在旧版本的IE浏览器中，我们会使用`filter`滤镜，创建一些诸如渐变的效果。在CSS3中filter有了更多用处，不同于基础CSS样式，滤镜元素会使浏览器提供硬件加速，提高渲染速度，而且现在主流器的支持度都不错,适应于几乎所有类型的元素，包括SVG及CSS动画。
 <!--more-->


![Support filter](http://7xt64w.com2.z0.glb.clouddn.com/BD38EBD4-18D5-493A-940A-9DA1DB9D366F.png)

### 参数
> **filter**: < filter-function > [< filter-function >] * | none	
**filter-function**：滤镜函数，包含`blur`，`brightness`，`contrast`，`drop-shadow`，`grayscale`，`hue-rotate`，`invert`，`opacity`，`saturate`，`sepia`10种及其任意组合。滤镜函数各自接收自己的参数，不成功则返回`none`。

### 滤镜函数

#### blur()
`filter:blur(5px)`,	将元素进行高斯模糊，函数的参数为模糊半径。
#### brightness()
调整元素的亮度，0即为全黑。
#### contrast()
增强或减弱元素的对比度，以`100%`为界。
#### drop-shadow()
为元素添加阴影，参数同`box-shadow`。
#### grayscale()
将元素转换为灰度图像，传入一个小于1的权重比，0即为全黑。
#### hue-rotate()
顾名思义，色相旋转。色相的概念是在HSL,HSV色系中的，H即为Hue色相。在色相中，红色为0度（360度）；黄色为60度；绿色为120度；青色为180度；蓝色为240度；品红色为300度。
[Wiki->色相](https://zh.wikipedia.org/wiki/%E8%89%B2%E7%9B%B8)
#### invert()
将元素转换为反色图像，接收一个代表权重的百分比参数，其中若参数为50%，则为色值均衡的黑色图像。
#### opacity()
将元素转换为一定透明度的图像，使用与`opacity`相同
#### saturate()
增强或减弱元素的饱和度，以100%为界。
#### sepia()
向元素添加棕褐色的滤镜。这是图像处理中的一种类似做旧的效果，ps中有个名字叫`Sepia Tone Effect `

### 例子
<p data-height="266" data-theme-id="light" data-slug-hash="zqaXvL" data-default-tab="css,result" data-user="chenze" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/chenze/pen/zqaXvL/">filter in CSS3</a> by nick_ChenZe (<a href="http://codepen.io/chenze">@chenze</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## background-blend-mode 样式
另外还有一种滤镜的实现方式，混合模式。
![support backgeound-blend-mode](http://7xt64w.com2.z0.glb.clouddn.com/screenshot.png)
### 参数
* normal
* multiply
* overlay
* screen
* darken
* lighten
* color-dodge
* color-burn
* hard-light
* soft-light
* difference
* exclusion
* hue
* saturation
* color
* luminosity

[Reference Link](https://www.w3.org/TR/compositing-1/#propdef-background-blend-mode)
### 例子
<p data-height="266" data-theme-id="light" data-slug-hash="GgavOP" data-default-tab="css,result" data-user="css-tricks" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/team/css-tricks/pen/GgavOP/">Background blend mode</a> by CSS-Tricks (<a href="http://codepen.io/css-tricks">@css-tricks</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>



