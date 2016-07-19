---
title: Permission denied解决办法
date: 2016-04-14 21:12:39
tags: ["github"]
categories: "笔记"
thumbnail: http://7xt64w.com2.z0.glb.clouddn.com/owl-158414_1280.png
---
## 连接Git时，Permission denied解决办法

`ssh-add -l`命令查看秘钥是否为空，若为空则生成的秘钥未被添加的连接队列中。

```bash
ssh-add ~/.ssh/[keyname]
```
`[keyname]`为你的秘钥名称，使用`ls ~/.ssh/`命令查看，添加完后再次查看，发现RSA秘钥已经被添加成功了。重新连接即可。

```
ssh -T git@github.com
```
 <!--more-->
