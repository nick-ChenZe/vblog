<template>
	<nav>
	    <ul class="social-bar inline clearfix">
		    <li>
		        <a href="/">Home
		        </a>
		    </li>
		    <li>
		        <a href="/#!/blog">Blog
		        </a>
		    </li>
		    <li>
		        <a href="/#!/category">
		        	Category
		        </a>
		    </li>
		    <li>
		        <a href="/#!/photo">
		        	Gallery
		        </a>
		    </li>
		    <li>
		        <a href="http://weibo.com/2064567411" target="_blank">
		        Weibo
		        </a>
		    </li>
		    <li>
		        <a href="">Weixin</a>
		    </li>
		    <li>
		        <a href="https://github.com/nick-ChenZe">
		        Github
		        </a>
		    </li>
		    <li>
		        <a href="/CV.html">
		        	CV
		        </a>
		    </li>
		</ul>
	</nav>
</template>
<style lang="less">
	nav{
		display: block;
		z-index: 99;
	}
	.inline li a{
		display: inline-block;
		position: relative;
		padding: .5em 1em;
		&:after{
			display: inline-block;
			position:absolute;
			content: '';
			width: 0;
			height: 100%;
			border-bottom: 4px solid #999;
			top: 0;
			left: 50%;
			transform: translate(-50%,0);
			transition: all .3s ease-out;
		}
		&:hover:after{
			width: 60%;
		}
	}
</style>