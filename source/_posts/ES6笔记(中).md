---
title: ES6笔记(中）
date: 2016-04-02 15:17:19
tags: ["ES6"]
categories: "笔记"
thumbnail: http://7xt64w.com2.z0.glb.clouddn.com/owl-158414_1280.png
---

## 二进制数组
### 概念

二进制数组内容`ArrayBuffer`，通过`TypeArray`和`DataView`两个对象接口来读写。
 <!--more-->


数组类型|含义|字节长度
---|---|---
`Int8`|8位带符号整数|1
`Int16`|8位带符号整数|2
`Int32`|8位带符号整数|4
`Uint8`|8位带符号整数|1
`Uint8C`|8位带符号整数|1
`Uint16`|8位带符号整数|2
`UInt32`|8位带符号整数|4
`Float32`|8位带符号整数|4
`Float64`|8位带符号整数|8

*注意，二进制数组并不是真正的数组，而是类似数组的对象。*

```js
var buf = new ArrayBuffer(32); //实例化对象
var dataView = new DataView(buf); //传入二进制对象(必须)
dataView.getUint8(0) // 0

//9种TypeArray都可以由构造函数创建
var x1 = new Int32Array(buf); 
//or 默认是0,成员连续且不为空
var x2 = new Int32Array(3); // [0,0,0]
//or
var x3 = new Int32Array([0,0,0]);
//可以接受任何类型的数组
var x3 = new Int32Array(new Int8(3)); //[0,0,0]
//同普通数组操作一致
x3[2] = 1; // [0,0,1]

buf.byteLength == 32 //true
Int8Array.BYTES_PER_ELEMEN //2
x3.byteLength //3
x3.byteOffset //0

//	slice是ArrayBuffer唯一允许的可以直接读写的方法，分配同等大小的内存空间，再将内容拷贝过去。
var newBuffer = buf.slice(0, 3);

//isView判断参数是否是视图实例，ArrayBuffer是全局变量
ArrayBuffer.isView(buf);// false
ArrayBuffer.isView(dataView);// true
ArrayBuffer.isView(x2);// true

//自定义视图 new TypedArray(buffer, byteOffset=0, length)
var b = new ArrayBuffer(8);
//创建32位整型，长度与buffer一样为8字节
var v1 = new Int32Array(b);
//byteOffset起始边界为字节2，直至末尾
var v2 = new Uint8Array(b, 2);
//length长度为2，即从2字节边界起，扩展2字节长度16位整型
var v3 = new Int16Array(b, 2, 2);	

//byteOffset要与TypeArray保持一致，8位整型最小单位是2字节
var v2 = new Uint8Array(b, 2);
// Uncaught RangeError: start offset of Int16Array should be a multiple of 2

//返回普通数组
var normalArray = Array.prototype.slice.call(typedArray);

//可以遍历
let ui8 = Uint8Array.of(0, 1, 2);
for (let byte of ui8) {
  console.log(byte);
}

//溢出
//当赋值大于数据类型最大值,正向溢出,数据类型的最小值加上余值,再减去1
//当赋值小于数据类型最小值,负向溢出,数据类型的最大值减去余值,再加上1
//简便方法：减去二进制长度Uint8即减去256 
var uint8 = new Uint8Array(1);

uint8[0] = 256;
uint8[0] // 0  256-256
//or
Unt8[0] = 128;
Unt8[0] // -128  126-256
//or
uint8[0] = -1;
uint8[0] // 255 255-256 

//Uint8ClampedArray是特例，通常同来表示像素属性
//溢出的结果都是边界
var uint8c = new Uint8ClampedArray(1);

uint8c[0] = 256;
uint8c[0] // 255

uint8c[0] = -1;
uint8c[0] // 0

//复制数组，比拷贝数组效率更高
var a = new Uint8Array(8);
var b = new Uint8Array(8);

b.set(a);
b.set(a,2)
//数组截断,返回一个新数组,@参数 开始序号，结束序号
var a = new Uint16Array(8);
var b = a.subarray(2,3);
a.byteLength // 16
b.byteLength // 2
//数组切割
let ui8 = Uint8Array.of(0, 1, 2);
ui8.slice(-1) //[2]
//from @参数，数组元素，遍历函数
Int16Array.from(Int8Array.of(127, 126, 125), x => 2 * x)

```
### 应用
#### AJAX,WebSocket,Fetch
传统上，服务器通过AJAX操作只能返回文本数据，即responseType属性默认为text。XMLHttpRequest第二版XHR2允许服务器返回二进制数据，这时分成两种情况。如果明确知道返回的二进制数据类型，可以把返回类型（responseType）设为arraybuffer；如果不知道，就设为blob。

Websocket可以允许发送，并接收`arrayBuffer`。

Fetch API取回的数据，就是`ArrayBuffer`对象
#### Canvas
Canvas的`getImageData`返回对象中的`data`就是`Uint8ClampedArray`，这个类型数组也是专门为这个api设计的。即当颜色超出255时，或者小于0时 不会溢出，取边界值。

## Set和Map数据结构
### Set
Set是一种新的数据结构,特点是内容不重复。

```js
var _set = new Set([1,2,3]); //Set {1,2,3}

// Set内部判断与一般不同，NaN等于自身，即只能插入一次
_set.add(NaN);
_set.add(NaN);//Set {1,2,3,NaN}

// Set有两个属性 size,constructor
console.log(_set.size); //4
console.log(_set.constructor); // function Set()

// Set有4个方法add,delete,has,value
_set.add(4) // {1,2,3,NaN,4}
_set.delete(1) //{2,3,NaN,4}
_set.has(NaN) //true
_set.clear() //Set {}

// 可以与数组间相互转化
var a = Array.from(new Set([1,2,3])) //[1,2,3]

// 数组去重
function dedupe(array) {
  return Array.from(new Set(array));
  // return [...new Set(array)] 更简单的
}
dedupe([1,1,2,3]) // [1, 2, 3]

// Set同其他数据结构一样，可以通过key,value,entries,forEach遍历,
for ( let item of _set.entries() ){
  console.log(item);
}
// [1,1]
// [2,2]
// [3,3]
// 但是键名和键值是同一个值

let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
//实现并集，交集，差集,前提是没有重复的值
//利用has取相同的值
let union = new Set([...a, ...b]); // [1,2,3,4]
let intersect = new Set([...a].filter(x => b.has(x))); // [2, 3]
let difference = new Set([...a].filter(x => !b.has(x))); // [1]

```

### WeakSet
故名思议，弱化的Set。

- 相同点：没有重复内容
- 不同点：内容只能是对象；不可遍历

WeakSet包含

一个属性 `constructor`
三个方法 `add()`,`delete()`.`has()`


```js
//通过构造函数创建
var ws = new WeakSet();

var b = [3, 4];
var ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)
// 试图向ws添加内容3,4

var a = [[1,2], [3,4]];
var ws = new WeakSet(a); // WeakSet {[1, 2], [3, 4]}
//向ws添加的是两队数组对象,而不是数组本身
```

### Map
#### 概念
```js
var data = {};
var element = document.getElementById("myDiv");

data[element] = metadata;
data["[Object HTMLDivElement]"] // metadata
```
Map的产生就是就来解决上面这种情况的，对象中的键名只接受字符串

Map同Set一样含有两个属性，5个方法，可遍历，遍历方法同数组和对象一致

```js
var map = new Map([["name", "张三"], ["title", "Author"]]);
// Map {"name" => "张三", "title" => "Author"} 
// 传入的数组中可遍历的内容，不是本身

var m = new Map();
// 可接受任何类型的键值,除了Null
m.set("edition", 6)        // 键是字符串
m.set(262, "standard")     // 键是数值
m.set(undefined, "nah")    // 键是undefined
m.set(null, "nah")    // 键是null
m.set(Null, "nah")    // 键是undefined
// Uncaught ReferenceError: Null is not defined

// has用来查找键名而不是键值
map.has("name") // true
map.has("Author") //false

// 删除键值对，@参数是可以key
// map.delete("name") // true

// 清除所有成员
map.clear();
```

#### 数据结构间相互转化
Map与其他三种Array，Object，JSON六种相互转换

```js
// Map => Array
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
[...myMap]
// Array => Map
new Map([[true, 7], [{foo: 3}, ['abc']]])
// Map => {}
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }

// {} => Map
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}
objToStrMap({yes: true, no: false})
// [ [ 'yes', true ], [ 'no', false ] ]

// Map => JSON
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}
// 当键名中有非字符串
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'

//JSON转Map
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}
jsonToStrMap('{"yes":true,"no":false}')
// Map {'yes' => true, 'no' => false}
```
### WeakMap
WeakMap只接受只接受对象作为键名，当对象被回收，同时移除对应的键值对。不可遍历，可以使用Map的4个方法。

它有两个作用，一是在js中为DOM元素设置属性

```js
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();

myWeakmap.set(myElement, {timesClicked: 0});

myElement.addEventListener('click', function() {
  let logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
  myWeakmap.set(myElement, logoData);
}, false);
```
第二个是设置对象的私有属性，当对象被回收，属性也会消失,不占用内存

```js
let _counter = new WeakMap();
let _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

let c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
```

## 遍历器
###概念
遍历器是用来给满足数据结构对象提供一种统计的遍历机制，也在创建数据结构是检测是否满足遍历要求，它部署在`Symbol.iterator`属性上面。

```js
var a = new Map([1,2])
console.log(a)
// Uncaught TypeError: Iterator value 1 is not an entry object(…)
```

对象没有部署`iterator`，是因为其没有标明顺序的序号即入口。但是你可以手动在其原型链上部署遍历器：`Object.prototype[Symbol.iterator]`。

```js
var a = new Map([[1,2],[2,3]])
console.dir(a)
// Map
//   size: 2
//   __proto__: Map
//   <entries>[2]
//     0: {1 => 2}
//     1: {2 => 3}

// 遍历器函数
Object.prototype[Symbol.iterator] = function(){

  var iterator = {
    next: next
  };

  var current = this;

  function next(){
    if (current){
      var value = current.value;
      var done = current == null;
      current = current.next;
      return {
        done: done,
        value: value
      }
    } else {
      return {
        done: true
      }
    }
  }
  return iterator;
}

//也可以直接引用
Object.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]

// 数组的遍历器接口只返回具有数字索引的属性，for...in只返回键名
let arr = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr) {
  console.log(i); // "0", "1", "2", "foo"
}

for (let i of arr) {
  console.log(i); //  "3", "5", "7"
}
```
自定义遍历器必须包含`next()`方法，但是`return()`和`throw()`这两个方法是可选的。
### 使用场景
1. 解构赋值
2. 扩展运算符（`...`）
3. `yield*`后面跟的是一个可遍历的结构
4. `for...of`
5. `Array.from()`
6. `Map()`, `Set()`, `WeakMap()`, `WeakSet()`
7. `Promise.all()`
8. `Promise.race()`

## Generator 函数
### 概念
迭代器本身是有一个带*的`function`关键词，以及函数内部的`yield`语句组成的。`yield`只能在`Generator`函数内部，其它情况下会报错。
函数使用和普通函数一样，在其后跟一对`()`,但是此时函数不会执行，只返回一个引用指针，这也是`Generator`函数无法创建构造函数的原因。这时传入的参数，也将会在其第一次调用`next()`方法是传入。所以迭代器的第一个`next()`是没有参数的。执行时会循环调用`iterator`的`next()`来修改函数的状态。`yield`后面表达式会被执行，如果是值则返回。停止等待下一次调用。

Generator函数也包含一个遍历器等于自身

```js
function* gen(){
  // some code
}
var g = gen();
g[Symbol.iterator]() === g
// true
```
Generator包含两个方法`throw`以及`return`，前者用来捕获内部的错误，不中断执行，后者用来返回对应的值，同时中断执行。

如果要在迭代器内部嵌套，则需要用到`*`关键词，不能直接嵌套

```js
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}
```

### 应用
#### 二叉树遍历
基于迭代嵌套，实现二叉树遍历

```js
// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}

result
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']
```
#### 控制流管理

原始回调

```js
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // Do something with value4
      });
    });
  });
});
```
利用`Promise`

```js
Q.fcall(step1)
  .then(step2)
  .then(step3)
  .then(step4)
  .then(function (value4) {
    // Do something with value4
  }, function (error) {
    // Handle any error from step1 through step4
  })
  .done();
```

用Generator函数改写

```js
function* longRunningTask() {
  try {
    var value1 = yield step1();
    var value2 = yield step2(value1);
    var value3 = yield step3(value2);
    var value4 = yield step4(value3);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}

scheduler(longRunningTask()); //自动调用

function scheduler(task) {
  setTimeout(function() {
    var taskObj = task.next(task.value);
    // 如果Generator函数未结束，就继续调用
    if (!taskObj.done) {
      task.value = taskObj.value
      scheduler(task);
    }
  }, 0);
}
``` 