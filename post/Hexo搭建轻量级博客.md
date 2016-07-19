---
title: Hexo搭建轻量级博客 
date: 2016-01-24 18:32:49
tags: ["hexo" , "blog" , "NexT"]
categories: "笔记"
---
## 准备工作

环境： `Mac OS X`

你需要预先安装：`NodeJS` `Git` 

Mac用户可以使用Homebrew安装git
 <!--more-->


首先安装Homebrew
>“Homebrew installs the stuff you need that Apple didn’t.
>——Homebrew 使 OS X 更完整”。

bash下：
```bash
curl -LsSf http://github.com/mxcl/homebrew/tarball/master | sudo tar xvz -C/usr/local --strip 1
```

再用brew安装git

```bash
brew install git
```

安装完成后

```bash
	brew list
```
或
```bash
	git --which
```

查看是否安装成功

安装[NodeJS](https://nodejs.org/en/ "node")

>Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。

下载完后
```bash
node -v
```

查看是否已经安装成功

安装npm 

```bash
node install npm -g
```

完成后 

```bash
npm -v
```

查看是否安装成功

最后是我们的的主角 hexo

>Hexo 是一款基于node 的静态博客网站生成器

作者的[Github](https://github.com/tommy351/hexo)

```bash
	sudo npm install hexo-cli -g
```

##  环境初始化

在任意磁盘下新建一个文件夹，为了方便命名为hexo

```bash
	mkdir hexo
	hexo init
```
hexo init 完成后，hexo的项目文件就在文件夹下生成了。
目录格式为

```bash
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```
现在你需要安装本地服务器端文件来运行查看，一切是否正常
```bash
npm install hexo-server --save
```
完成后,启动服务在[本地4000端口](localhost:4000)查看是否成功

```bash
hexo server
```
你可以尝试发布一篇新的博文看下效果

```bash
hexo new title 
```
重新启动服务器看是否生成了
具体配置细节可以查看[官方](https://hexo.io/zh-cn/docs/setup.html)给出的具体的说明

## 连接Github Page
完成了上面这些，你还是直有一个能在本地访问的的博客而已，我们想要的效果是能将自己的文字与别人分享，所以我们需要一个githubpage。
创建帐号后我们要新建一个`Repository`，name你的github用户名加后缀.github.io
这样你就有自己个githubpage页面了，等待部署完毕后，nickname.github.io即你的网站已经可以访问了。但是怎么把hexo和其同步呢？
如果这不是第一次使用git，那么需要确认SSH KEYS是否存在

```bash
cd ~/.ssh
```

如果存在将其备份后清楚


```bash
mkdir key_backup
cp id_rsa* key_backup
rm id_rsa*

```

生成新的key


```bash
ssh-keygen -t rsa -C "邮件地址@youremail.com"
```
确认回车后，会需要输入加密钥。照提示输入就好
找到`id_rsa.pub`文件复制里面的key到github上，之后连接github

```bash
ssh -T git@github.com
```
如果认证成功你会看到

```bash
The authenticity of host 'github.com (207.97.227.239)' can't be established.
RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
Are you sure you want to continue connecting (yes/no)?
```
说明你还没有配置帐号，输入`yes`

```bash
git config --global user.name "你的名字"
git config --global user.email "your_email@youremail.com"
```
可以参考官方声称ssh key的文档[Generating a new SSH key
](https://help.github.com/articles/generating-a-new-ssh-key/)

记得将站点配置文件关联githubpage

```yml
# Deployment
## Docs: http://hexo.io/docs/deployment.html
deploy:
  type: git
  repository: git@github.com:nick-ChenZe/nick-ChenZe.github.io.git
  branch: master
```
最新的hexo需要将`type`设置*git*而不是*github*



## 站点参数配置
hexo一般会有两个配置文件，即`_config.yml`。我们一般称根目录下为站点配置文件，`theme`目录下的为主题配置文件，已为的站点为例，先介绍站点配置文件。

```yml
#Site
	title: 爱西木的竖八不正
	subtitle: 前端工程师，Javascript
	description: 明月装饰了你的窗，你装饰了别人的梦。
	author: Zeller
	language: zh-Hans
	timezone:
	duoshuo_shortname: chenze
	baidu_analytics: ********
```

`title`：即为站点名称，html中的title

`subtitle`：顾名思义，子标题

`description`： 描述，会出现在站点子标题下
`author`：作者，一般会出现在页底
`language`：语言，默认主题landscape支持英语，简体中文`zh-CN`和繁体`zh-TW`, 不同主题的关键词不同
`timezone`：时区
`duoshuo_shortname`: 注册多说账号时生成的short name，hexo还提供另一种留言版disqus，但是国内可能还是多说更方便，但是为人并不是很推荐多说，一试页面加载负担变重，另一方遍信息安全没有保障。
`baidu_analytics`：百度分析，注册后可以对网站流量进行详细分析（下次再说）

```yml
social:
  GitHub: https://github.com/nick-ChenZe
  # twitter: https://twitter.com/your-user-name
  微博: http://weibo.com/2064567411
  豆瓣: http://www.douban.com/people/14814660/
  知乎: https://www.zhihu.com/people/chen-yi-feng-65
  # 等等
```
这里社交栏链接，如果这里命名时中文，在对应主题文件的`social icon`处也要设置成中文，这样才能正确输出字体图标

```yml
# Show number of visitors to each article.
# You can visit https://leancloud.cn get AppID and AppKey.
leancloud_visitors:
  enable: true
  app_id: ************
  app_key: **************
```
[leancloud](https://leancloud.cn/)为每篇博文提供阅读人数功能
>LeanCloud 是加速应用开发的一站式解决方案，专注于为应用开发者提供一流的工具、平台和服务。

创建帐号后，进入应用页面，默认再存储板块，点击左侧栏数据边上的设置图标，创建`Class`讲其命名为`Counter`（*别的名字无效*）。完成后点击上方当行栏设置，应用创建的应用后，将自己的id和key复制到站点配置文件即可。你可以设置安全域名！
 
## 主题配置
我使用的是[NexT](https://github.com/iissnan/hexo-theme-next)




 
	
