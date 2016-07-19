---
title: ES6笔记(上）
date: 2016-03-15 20:20:19
tags: ["ES6"]
categories: "笔记"
thumbnail: http://7xt64w.com2.z0.glb.clouddn.com/owl-158414_1280.png
---
## 没关系的引导语            
>Zach LaVine: "You're always going to remember. It's never going to fade. Time is a little bit like scars. There's still a little bit of the scar."

 <!--more-->


## 笔记

### let块级声明

1. 与`var`不同，不存在变量提升。 
2. 高于全局变量，即在块作用域内，如果let声明了变量，要使用，必须在区块内的定义后。
3. 存在暂时性死区（Temporial Dead Zone），声明之前，直接使用变量会报错，不会返回`undefined`
4. 在TDZ内，使用`typeof`也会报错

### 为什么要用块级作用域
1. 避免覆盖全局变量（局部内重新定义全局变量）
2. 避免局部泄露至全局（局部内操作全局函数，退出后会泄露值）
3. 代替立即执行匿名函数（我们为了避免污染而创造的）

> ES5的严格模式下，循环内不能定义函数。

### 定义
1. const常量定义一定要赋值，不能先定义，再赋值。
2. 解耦定义`[a,b,c] = [1,2,3]`
3. 交换变量`[x,y]=[y,x]`

### 迭代
1. `for( a of obj )`遍历属性
2. `for( [key] of obj )`遍历键值
3. `for( [,value] of obj)`遍历值
4. `for( [key,value] of obj)`完整的遍历

### 字符串扩展
1. `includes(str,idx)`判断查找从idx起是否包含str字符串
2. `startsWith(str,idx)`判断从idx起是否已str开头
3. `endsWith(str,idx)`判断从idx起是否已str结尾
4. `repeat(count)`返回重复count次数的当前字符串，自动取整
5. `padStart(len,str)`在字符串前补全长度为len的str
6. `padEnd()`在字符串后补全长度为len的str
7. `raw()`返回替换变量后的模板字符串


### Number扩展
1. `isNaN()`判断是否是Nan，ES5中`NaN`不能其本身
2. `isFinite()`判断是否有穷
3. `parseInt()`原来全局函数，移植到Number上
4. `isInteger()`判断是否是整数
5. `epsilon()`返回一个极小数，为了判断浮点数计算
6. `isSafeInteger()`用来判断传入的参数值是否是一个“安全整数”（处于 -(2^53 -1) 和 2^53 -1 之间的整数）。

### 数学方法扩展
1. `Math.sinh(x)` 返回x的双曲正弦
2. `Math.cosh(x)` 返回x的双曲余弦
3. `Math.tanh(x)` 返回x的双曲正切
4. `Math.asinh(x)` 返回x的反双曲正弦
5. `Math.acosh(x)` 返回x的反双曲余弦
6. `Math.atanh(x)` 返回x的反双曲正切
7. `trunc()` 去除小数
8. `sign()`判断正负
9. `cbrt()`返回立方根
10. `clz32()`回一个数的32位无符号整数形式有多少个前导0
11. `Math.imul()`JavaScript有精度限制，超过2的53次方的值无法精确表示。这就是说，对于那些很大的数的乘法，低位数值往往都是不精确的，Math.imul方法可以返回正确的低位数值。
10. `hypot()`平和方的开放，类似勾股定理
11. `expm1(x)=>e^x-1`自然数指数
12. `log1p()=>log(1+x)`自然对数
13. `log10()`以10为底的对数
14. `log2()`以2为底的对数

### 数组扩展

1. `Array.from(obj,statement)`将可枚举对象转为数组，做值修改
常见的Dom节点组
	
	```js	
	querySelectAll -> nodelist 
	
	from(nodelist).foreach(function(p){})
	```
2. `Array.of()=> []` 将一组值转为数组
3. `copyWith(target,start,end)`从target位置开始替换数组，替换为从start位置开始取的值，end默认为数组长度

	```js	
	[1, 2, 3, 4, 5].copyWithin(0, 3)
	// [4, 5, 3, 4, 5]
   ```
4. `Array.of()=> []` 将一组值转为数组
5. `find(callback(value, index, arr))`找出第一个符合条件的数组成员

	```js
	[1, 4, -5, 10].find((n) => n < 0)
	```

6. `findIndex(callback(value, index, arr))`找出第一个符合条件的数组成员的索引
7. `entries()`返回键值对
8. `keys()`返回键值
9. `values()`返回值
10. `includes(,start)`数组是否包含特定值
11. `copyWith(target, start, end)`在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组

### 数组推导

```js
var years = [ 1954, 1974, 1990, 2006, 2010, 2014 ];

[for (year of years) if (year > 2000) year];
```

遍历json

```js
var customers = [
  {
    name: 'Jack',
    age: 25,
    city: 'New York'
  },
  {
    name: 'Peter',
    age: 30,
    city: 'Seattle'
  }
];

var results = [
  for (c of customers)
    if (c.city == "Seattle")
      { name: c.name, age: c.age }
];
results // { name: "Peter", age: 30 }
```

### 函数

1. 参数默认值
	
	```js
	function(x,{name='unset',address='unset'}={})
	```

	如果不加={} 第二个参数不能省略
	
	默认参数最好写在尾巴，可以省略

2. rest 参数
	
	```js
	function foo(...values){
		 for(val in values){
		 
		 }
	}
	
	foo(1,2,3);	

	```
3. `spread`将一个数组转为用逗号分隔的参数序列
	
	```js
	\\spread => ...[1,2,3]
	[1,2,...[3,4,5]]
	function(...[1,2,3]) 
	```


4. 箭头函数

```js
var f = v => v;
```
```js
var sum = (num1, num2) => num1 + num2;
```
```js
var sum = (num1, num2) => { return num1 + num2; }
```
```js
var getTempItem = id => ({ id: id, name: "Temp" });
```

5. 简化回调函数

```js
[1,2,3].map(x => x * x);
```

>箭头函数有几个使用注意点。
>
1. 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
2. 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
3. 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。
4. 不可以使用yield命令，因此箭头函数不能用作Generator函数。


```js
// λ演算的写法
fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))

// ES6的写法
var fix = f => (x => f(v => x(x)(v)))
               (x => f(v => x(x)(v)));
```              

函数绑定运算符是并排的两个双冒号（`::`），双冒号左边是一个对象，右边是一个函数。

```js
foo::bar;
// 等同于
bar.bind(foo); //foo 返回对象
```

### 尾调用优化
尾调用之所以与其他调用不同，就在于它的特殊的调用位置。

我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

```js
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
```
上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除 `f(x) `的调用帧，只保留` g(3)` 的调用帧。

这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。

```js
function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}
```
上面的函数不会进行尾调用优化，因为内层函数inner用到了，外层函数addOne的内部变量one。

### 尾递归
函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

```js
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(5) // 120
```
	
上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 。

如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。

```js
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
	
factorial(5, 1) // 120
```

由此可见，“尾调用优化”对递归操作意义重大，所以一些函数式编程语言将其写入了语言规格。ES6也是如此，第一次明确规定，所有ECMAScript的实现，都必须部署“尾调用优化”。这就是说，在ES6中，只要使用尾递归，就不会发生栈溢出，相对节省内存。

### 递归函数的改写
尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。比如上面的例子，阶乘函数 `factorial `需要用到一个中间变量 `total` ，那就把这个中间变量改写成函数的参数。这样做的缺点就是不太直观，第一眼很难看出来，为什么计算5的阶乘，需要传入两个参数5和1？

两个方法可以解决这个问题。方法一是在尾递归函数之外，再提供一个正常形式的函数。

```js
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}
	
function factorial(n) {
  return tailFactorial(n, 1);
}
	
factorial(5) // 120
```

上面代码通过一个正常形式的阶乘函数 `factorial` ，调用尾递归函数 `tailFactorial `，看起来就正常多了。

函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。

	function currying(fn, n) {
	  return function (m) {
	    return fn.call(this, m, n);
	  };
	}
	
	function tailFactorial(n, total) {
	  if (n === 1) return total;
	  return tailFactorial(n - 1, n * total);
	}
	
	const factorial = currying(tailFactorial, 1);
	
	factorial(5) // 120
上面代码通过柯里化，将尾递归函数 tailFactorial 变为只接受1个参数的 factorial 。

第二种方法就简单多了，就是采用ES6的函数默认值。

	function factorial(n, total = 1) {
	  if (n === 1) return total;
	  return factorial(n - 1, n * total);
	}
	
	factorial(5) // 120
上面代码中，参数 total 有默认值1，所以调用时不用提供这个值。

总结一下，递归本质上是一种循环操作。纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，这就是为什么尾递归对这些语言极其重要。对于其他支持“尾调用优化”的语言（比如Lua，ES6），只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。

>ES6的尾调用优化只在严格模式下开启，正常模式是无效的。
>
>这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。
>
>1. `func.arguments`：返回调用时函数的参数。
>2. `func.caller`：返回调用当前函数的那个函数。

### 对象简写
```js
var o = {
  method() {
    return "Hello!";
  }
};
o = {'method': function(){return "Hello!";}}
````

### 同值相等	
`Object.is(a,b)`判断a,b是否相等


### 对象拷贝

```js
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
```
	
`Object.getOwnPropertyDescriptor`方法可以获取该属性的描述对象。

```js
let obj = { foo: 123 };
 Object.getOwnPropertyDescriptor(obj, 'foo')
 //   { value: 123,
 //     writable: true,
 //     enumerable: true,
 //     configurable: true }
```
ES6一共有6种方法可以遍历对象的属性
> 
> （1）for...in
> 
> for...in循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）。
> 
> （2）Object.keys(obj)
> 
> Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）。
> 
> （3）Object.getOwnPropertyNames(obj)
> 
> Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包括不可枚举属性）。
> 
> （4）Object.getOwnPropertySymbols(obj)
> 
> Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有Symbol属性。
> 
> （5）Reflect.ownKeys(obj)
> 
> Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。
> 
> （6）Reflect.enumerate(obj)
> 
> Reflect.enumerate返回一个Iterator对象，遍历对象自身的和继承的所有可枚举属性（不含Symbol属性），与for...in循环相同。

### 解耦定义
```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
```

1. 必须是最后一个参数
2. 等号右边必须是一个对象
3. 浅拷贝


### Symbol（）

1. 不是对象，不需要new操作符
2. 接收一个字符串参数`Symbol('str')`
3. 无法比较
4. 不能运算
5. 	可以转化为字符串和布尔值(同字符串)
6. Symbol不代表一个唯一字符串，而是一个唯一值，即和自己比较时才能相等（引用地址相同）。
7. Symbol每次调用都会创建一个新的Symbol值，但是Symbol.for()会先查找是否存在。
8. Symbol.keyFor(target)返回登记了Symbol的键值
9. 扩展方法
 1. `Symbol.isConcatSpreadable `对象的	Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象使用Array.prototype.concat()时，是否可以展开。
 2. `Symbol.hasInstance` 对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)
 3. `Symbol.species`对象的Symbol.species属性，指向一个方法。该对象作为构造函数创造实例时，会调用这个方法。即如果this.constructor[Symbol.species]存在，就会使用这个属性作为构造函数，来创造新的实例对象。
 4. `Symbol.match`对象的Symbol.match属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。
 5. `Symbol.replace`对象的Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值。
 6. `Symbol.search`对象的Symbol.search属性，指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值。
 7. `Symbol.split`
 8. `Symbol.iterator`
 9. `Symbol.toPrimitive`
 10. `Symbol.toStringTag`
 10. `Symbol.unscopables`


### Proxy和Reflect

Proxy用于拦截对象的操作，原本我们在对象操作时，如果需要判断条件，则需要条件判断后，再传入修改后的参数。但是Proxy提供了这种机制，可以根据行为的不同，操作对象，最简单的类型判断。而Reflect是以Proxy同方式的去执行对象上的操作，替代原来的命令式的语句，返回新对象的结果。

Proxy：

（1）`get(target, propKey, receiver)`

拦截对象属性的读取，比如proxy.foo和proxy['foo']，返回类型不限。最后一个参数receiver可选，当target对象设置了propKey属性的get函数时，receiver对象会绑定get函数的this对象。

（2）`set(target, propKey, value, receiver)`

拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。

（3）`has(target, propKey)`

拦截propKey in proxy的操作，返回一个布尔值。

（4）`deleteProperty(target, propKey)`

拦截delete proxy[propKey]的操作，返回一个布尔值。

（5）`enumerate(target)`

拦截for (var x in proxy)，返回一个遍历器。

（6）`ownKeys(target)`

拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回对象所有自身的属性，而Object.keys()仅返回对象可遍历的属性。

（7）`getOwnPropertyDescriptor(target, propKey)`

拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。

（8）`defineProperty(target, propKey, propDesc)`

拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。

（9）`preventExtensions(target)`

拦截Object.preventExtensions(proxy)，返回一个布尔值。

（10）`getPrototypeOf(target)`

拦截Object.getPrototypeOf(proxy)，返回一个对象。

（11）`isExtensible(target)`

拦截Object.isExtensible(proxy)，返回一个布尔值。

（12）`setPrototypeOf(target, proto)`

拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。

如果目标对象是函数，那么还有两种额外操作可以拦截。

（13）`apply(target, object, args)`

拦截Proxy实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

（14）`construct(target, args, proxy)`

拦截Proxy实例作为构造函数调用的操作，比如new proxy(...args)。


Reflect：

1. `Reflect.apply(target,thisArg,args)`
2. `Reflect.construct(target,args)`
3. `Reflect.get(target,name,receiver)`
4. `Reflect.set(target,name,value,receiver)`
5. `Reflect.defineProperty(target,name,desc)`
6. `Reflect.deleteProperty(target,name)`
7. `Reflect.has(target,name)`
8. `Reflect.ownKeys(target)`
9. `Reflect.enumerate(target)`
10. `Reflect.isExtensible(target)`
11. `Reflect.preventExtensions(target)`
12. `Reflect.getOwnPropertyDescriptor(target, name)`
13. `Reflect.getPrototypeOf(target)`
14. `Reflect.setPrototypeOf(target, prototype)`


### 取消Proxy 
由revocable返回一个取消的函数（返回一个对象，proxy属性是实例，revoke属性是取消函数）

```js
let {proxy, revoke} = Proxy.revocable(target, handler);
revoke()；
```


