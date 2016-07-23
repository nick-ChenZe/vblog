---
title: util模块
date: 2016-04-26 21:32:44
tags: 
categories: "笔记"
thumbnail: http://7xt64w.com2.z0.glb.clouddn.com/owl-158414_1280.png
---
### util.debuglog(section) 
format日志信息，return一个函数，类似console.error

```js
const util = require('util');
const debuglog = util.debuglog('foo');

debuglog('hello from foo [%d]', 123);
//log: FOO 3245: hello from foo [123] 
// 3245进程id
```	
### util.deprecate(function, string) 不懂

### util.format(format[, ...])
如果第一个参数不含format字符串，怎会合并所有参数为一个字符串。每个占位字符串只会替换对应索引的format string

```js
util.format('%s:%s', 'foo');
// Returns 'foo:%s'
util.format('%s:%s', 'foo', 'bar', 'baz'); 
// 'foo:bar baz'
```
### util.inherits(constructor, superConstructor) 不提倡

### util.inspect(object[, options])


