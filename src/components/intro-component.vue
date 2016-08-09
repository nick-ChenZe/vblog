<template>
	<section class="media col-xs-4">
	    <div class="media-left media-middle">
		    <a href="#">
		      <img class="media-object img-circle" src="/lib/assets/avatar.jpeg" alt="...">
		    </a>
  		</div>
	  	<div class="media-body media-middle">
	    	<span>{{$root.setting.user.linkname}}<button class="btn btn-sm">follow</button></span>
	    	<br>
	    	<p class="sub">
				{{$root.setting.user.introduction}}
				<br>
				{{date| dateAgo}}
	    	</p>
	  	</div>
	</section>
</template>
<script type="text/javascript">
    import {dateAgo} from '../filters';
	export default{
		name: 'intro',
		props:['date'],
		filters: {dateAgo}
	}
</script>
<style lang="less" scoped>
	.media{
		font-size: 12px;
		padding: 0;
		.btn{
			margin-left: .8em;
			vertical-align: 0;
		}
		.sub{
			line-height: 1.5;
			margin: 0;
		}
		img{
			width: 60px;
			height: 60px;
		}
	}
</style>