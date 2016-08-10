<template>
	<section>
		<h5 class="sub title">- 关于我</h5>
		<div class="avatar">
			<img src="/lib/assets/avatar.jpeg">
		</div>
		<p class="sub">{{$root.setting.user.introduction}}</p>
		<div class="social">
			<a v-bind:href="item.link" target="_blank" class="btn btn-sm btn-default" v-for="item in $root.setting.social">{{item.name}}</a>
		</div>
	</section>
</template>
<style lang="less" scoped="">
	section{
		>.title{
			padding: 10px 0;
			font-weight: 700;
			margin: 0;
			border-bottom: 1px solid #ddd;
		}
		>.avatar{
			overflow: hidden;
			>img{
				max-width: 100%;
				max-height: 400px;
				border-radius: 5px;
				margin: 1em auto;
			}
		}
		.sub{
			font-size: 14px; 
		}
		.social{
			font-size: 14px;
			a{
				margin-right: .5em;
			}
		}
	}
</style>