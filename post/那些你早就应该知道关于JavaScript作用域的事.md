---
title: "[译]那些你早就应该知道关于JavaScript作用域（scope）的事"
date: 2016-04-17 23:12:19
tags: [JavaScript,闭包,作用域]
categories: "翻译"
banner: http://i.niupic.com/images/2016/04/20/WZpXaW.jpg
thumbnail: http://7xt64w.com2.z0.glb.clouddn.com/quill-175980_1280.png
---
## 引言 
>原文地址：https://spin.atomicobject.com/2014/10/20/javascript-scope-closures
>
>原文标题：What You Should Already Know about JavaScript Scope
>
>译者注：术语在第一次使用时会在括号内备注

如果你是一个JavaScript菜鸟，或者说你已经为了给你的网站添加几个动画效果被JQuery弄的一头包，现在是你弥补这一大块JavaScript知识的机会。

 <!--more-->

其中一个最重要的概念就是作用域如何绑定到`this`上的。

基于这一点，当我在讨论作用域时（ 块级`(block)`作用域 vs. 函数作用`(function)`域，其中的关键词，词法作用域`(lexcial)` vs. 动态作用域`(dynamic)` ）我假定你已经对基础的JavaScript语法和对象以及常规术语有一定的了解。

## 词法作用域

首先，JavaScript在函数作用域内还包含有词法作用域。换句话说，即使JavaScript看上去应该是一种有块级作用域的，因为它使用了`{}`花括号，只有当你创建一个函数时，一个新的块级作用域才会产生。

```js
var outerFunction  = function(){
 
   if(true){
      var x = 5;
      //console.log(y); //line 1, ReferenceError: y not defined
   }
 
   var nestedFunction = function() {
 
      if(true){
         var y = 7;
         console.log(x); //line 2, x will still be known prints 5
      }
 
      if(true){
         console.log(y); //line 3, prints 7
       }
   }
   return nestedFunction;
}
var myFunction = outerFunction();
myFunction();
```

在这个例子中，在`outerFunction()`这个函数内部，变量x是随时随地都可以获取到的。同样的，变量y也是暴露在`nestedFunction()`内部的，但是它们在定义的函数外部都是无法获取到的。词法作用域能够解释这个问题。变量的作用在源码中它们定义的位置被同时定义。为了处理这些变量，JavaScript会从最内部的作用域开始查找逐步向外直到找到想找到的变量为止。词法作用域很好，因为它能帮助我们在源码中很简单的找到变量的值；但是在动态作用域内，变量意义会在程序运行时改变，使它看起来更加复杂。

## 闭包(Closures)

事实上，我们还是没有搞清楚为什么变量x我们能获取到，因为，正常来讲，一个函数内部的本地变量会在函数执行完随函数一起被回收。我们调用了`outerFunction() `这个函数，还委派它的结果，`nestedFunction()`，让`myFunction()`指向它。如果`outerFunction()`已经回收了，为什么变量x依然存在。

仅仅是为了在立即作用域`(immediate scope)`（不需要返回语句）外部获取变量将会创造一个叫闭包的东西。火狐开发者网络（MDN）对此给了一个很好的定义：
>闭包是一种特殊的对象，它由两种东西组合：一个函数，和函数创建的环境。这个环境有持很多在闭包创建时的本地变量。

由于x是创建函数`nestedFunction()`的环境的一个成员，所以`nestedFunction()`可以有权得到它。还不清楚吗？接下来就更有趣了，因为这看上不去不像是常规的变量。试试这个例子，它在一个包含许多属性的对象中嵌套了函数。

```js
var cat = {
 
   name: "Gus",
   color: "gray",
   age: 15,
 
   printInfo: function() {
      console.log("Name:", this.name, "Color:", this.color, "Age:", this.age); //line 1, prints correctly
 
      nestedFunction = function() {
          console.log("Name:", this.name, "Color:", this.color, "Age:", this.age); //line 2, loses cat scope
      }
 
   	   nestedFunction();
    }
}
cat.printInfo(); //prints Name: window Color: undefined Age: undefined
```

为什么在日志的第二行`color`和`age`都是`undefined`？你可能会这样想，“`cat`这个对象的属性很清楚的定义在上面这个例子中，而且还在最外面的全局中，不是吗？”

当JavaScript在函数内部的调用函数，且该函数内部还嵌套的另外一个函数时会丢失这个作用域。当这个作用域丢失时，默认的，它会被绑定到全局的`window`对象。在我们的例子中，和结果和我们说的一样，`window`对象也有一个值为`window`的`name`属性。

## 控制作用域（Controlling Context）

所以还有什么要讲的呢？

我们不能改变词法作用域是如何在JavaScript工作的，但是我们能够控制我们调用函数的上下文。上下文是在程序运行期间当函数被调用时决定的，它一般都会与一个对象绑定，函数在这个对象内被调用。只有一个例子不适用于这个规则，上面我们提到的嵌套函数。

刚才说了，要改变上下文，我的意思是，我们要改变这个`this`真正的指向。在下面这个例子中。日志的第一行和第二行会打印出什么呢？

```js
var obj1 = {
   printThis: function() {
      console.log(this);
   }
};
 
var func1 = obj1.printThis;
obj1.printThis(); //line 1
func1(); //line 2
```

第一行打印出了对象`obj1`。第二行打印出了`window`对象。第一行的上下文是`obj1`，因为我们直接调用了`printThis()`这个函数。但是，在调用`func1()`时，我们首先存储了对于`printThis()`函数的引用，之后在全局对象的上下文中调用了它；结果就是，它把全局对象`window`打印出来了。如果`func1()`被嵌套在不同的函数内，那么打印的结果就是它自己的上下文。

## 三个函数 Call, Bind, and Apply

有很多方法可以控制`this`的值，包括下面这些：

1. 在另一个变量中存储一个`this`的引用
2. `.call()`
3. `.apply()`
4. `.bind()`

第一个：


```js
var cat = {
   name: "Gus",
   color: "gray",
   age: 15,
 
   printInfo: function() {
      var that = this;
      console.log("Name:", this.name, "Color:", this.color, "Age:", this.age); //prints correctly
 
      nestedFunction = function() {
         console.log("Name:", that.name, "Color:", that.color, "Age:", that.age); //prints correctly
      }
   nestedFunction();
   }
}
cat.printInfo();
```

因为我们将`this`绑定到一个变量上，所以它会和其他变量一样是可以访问的。接下去让我们试试`call()`, `apply()`, and `bind()`这三个函数，我想应该会更简洁。

```
var cat = {
   name: "Gus",
   color: "gray",
   age: 15,
 
   printInfo: function() {
      console.log("Name:", this.name, "Color:", this.color, "Age:", this.age);
      nestedFunction = function() {
         console.log("Name:", this.name, "Color:", this.color, "Age:", this.age);
      }
      nestedFunction.call(this);
      nestedFunction.apply(this);
 
      var storeFunction = nestedFunction.bind(this);
         storeFunction();
      }
}
cat.printInfo();
```

注意每个函数的第一个参数：`this`。它代表了`cat`对象。现在，`nestedFunction()`函数的`this`就指向了`cat`对象。如果，我们传入一个`dog`对象，而不是传入`this`，那么函数的`this`就是指向`dog`的。
简单来说，第一个参数就代表了`nestedFunction()`函数的`this`指向。

所以这三个函数有什么不同呢？

`call`和`apply`最大的不同是如何传入额外的参数。`call`函数需要传入用逗号隔开的多个参数，才能让`nestedFunction()`能够接收到。`bind`和`call`情况一样。但是，`apply`传入的是一个单个数组，这个数组包含了要传入的所有参数。

这对于记住如何用`call`和`apply`真正你的函数很重要。下面这是不正确的（注意`nestedFunction`后面的`()`）:

```js
   nestedFunction().call(this);
```

`bind()`函数,换句话说，很讨巧，因为它允许你改变`this`的引用，接着在一个准备以后调用的变量上，存储一个改变了的函数的引用（看上面代码例子中的`storeFunction`）。同事，因为`call`和`apply`会立即在函数内执行，它们都会返回函数调用的结果。

## 应用练习 Practical Applications

至此，我们了解了闭包，`call()`，`apply()`，`bind()`，但是我们没有讨论过任何实际应用的例子和什么时候该用什么区绑定正确的`this`。

在面对类似上面第一个`cat`对象例子的嵌套函数时，闭包是最好的选择，我们可以`var that = this`这样。这个方法同样很多，因为你不需要担心跨域的问题。另外，`bind`函数在ECMAScript5中刚被添加的，浏览器支持度还不是很好。


`call`和`apply`当你需要在一个完全不同的对象上下文内调用另一个对象的方法时是非常有用的。举个例子，用我们上面cat那个例子，我们能够复用`printInfo()`函数打印`dog`对象的信息。

`bind`在异步回调和事件中维持上下文非常有用。

很好！我希望你现在已经有一点了解作用域在JavaScript中是如何处理的。我们涵盖了基础的函数作用域中词法作用域，闭包，通过上下文控制闭包，`call()`，`apply()`，`bind()`，然后最后的最后，多做一些练习应用。
