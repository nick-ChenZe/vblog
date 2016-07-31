<template>
	<section class="media">
	  	<div class="media-left media-middle col-md-6">
		    <div class="media-left media-middle">
			    <a href="#">
			      <img class="media-object img-circle" src="/lib/assets/avatar.jpeg" alt="...">
			    </a>
	  		</div>
		  	<div class="media-body media-middle text-center">
		    	<h4 class="media-heading">{{$root.setting.user.username}}</h4>
		    	<a v-bind:href="$root.setting.user.href">{{$root.setting.user.linkname}}</a>
		  	</div>

	 	</div>
	  	<div class="media-body middle col-md-6">
	  		<p class="text-overflow">
				{{$root.setting.user.introduction}}
			</p>
	  	</div>
	</section>
</template>
<script type="text/javascript">
	export default{
		name: 'intro'
	}
</script>
<style lang="less" scoped>
	img{
		width: 100px;
		height: 100px;
	}
	.media{
		&>.media-middle{
			padding: 0 80px;
			a{
				color: rgba(0,0,0,.5);
			}
		}
		&>.media-body{
			width: 50%;
		}
	}
	.middle{
		line-height: 100px;
		border-left:  1px solid #ddd;
		p{
			display: inline-block;
			text-indent: 2em;
			line-height: 1.4;
		}
	}
</style>