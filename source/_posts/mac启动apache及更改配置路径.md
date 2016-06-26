---
title: mac启动apache及更改配置路径
date: 2016-04-16 21:32:44
tags: 
categories: "笔记"
thumbnail: http://7xt64w.com2.z0.glb.clouddn.com/owl-158414_1280.png
---
>apache配置方法网上很多，也很简单，这里主要是针对2.3+版本更改根路径踩的坑做个记录

 <!--more-->
 
[参考链接](http://www.cnblogs.com/snandy/archive/2012/11/13/2765381.html)

Mac下apache是默认开启的，根路径是`/Library/WebServer/Documents/ `，你也可以通过命令重启

```bash
sudo apachectl restart
```
启动虚拟主机配置，在`/etc/apache2/httpd.conf`将下面这行取消注释

```bash
#Include /private/etc/apache2/extra/httpd-vhosts.conf
```

接着配置虚拟主机`/etc/apache2/extra/httpd-vhosts.conf`，将原来两个虚拟主机注释掉，添加如下配置

```bash
<VirtualHost *:80>
    DocumentRoot "/Library/WebServer/Documents"
    ServerName localhost
    ErrorLog "/private/var/log/apache2/localhost-error_log"
    CustomLog "/private/var/log/apache2/localhost-access_log" common
</VirtualHost>
 
<VirtualHost *:80>
    DocumentRoot "/Users/snandy/work"
    ServerName mysites
    ErrorLog "/private/var/log/apache2/sites-error_log"
    CustomLog "/private/var/log/apache2/sites-access_log" common
#    <Directory />
#                Options Indexes FollowSymLinks MultiViews
#                AllowOverride None
#                Order deny,allow
#                Allow from all
#     </Directory>
     <Directory /Users/chenze/Documents/host>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```
注释掉部分是原来低版本apache配置，下面是2.3版本后的，在`Directory`标签内增加虚拟主机的路径。
>一定要保留日志记录，以查询故障！当时配置完，也是查看log发现不对，在stack上找到解决办法的。
`ServerName`不建议像我这样设置成单词，最好还是短路径类似`mysites.com`，否则浏览器不明白应该是提交到搜索引擎还是直接解析。

最后在`host`里添加DNS解析就可以了。