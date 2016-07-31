<template>
	<div>
		<h3>评论区</h3>
		<div class="ds-thread" 
			:data-thread-key="key" 
			:data-title="title" 
			:data-url="url">
		</div>
	</div>
</template>
<style lang="less" scoped>
	h3{
		background-color: #eee;
		padding: 1em;
	}
</style>
<script type="text/javascript">
	export default{
		name: 'commentBox',
		props:['key','title','url'],
		methods:{
			init(){
				if (window.DUOSHUO) {
		            var head = document.querySelector("head");
		            var el = document.querySelector("#ds-thread");
		            if(el){el.innerHTML = '';}
		            var oldEl = document.querySelector("[src*='embed.js']");
		            head.removeChild(oldEl);
		            window.DUOSHUO = null;
		        } 
	            this.append();
			},
			append(){
				var ds = document.createElement('script');
	            ds.type = 'text/javascript';
	            ds.async = true;
	            ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
	            ds.charset = 'UTF-8';
	            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
			}
		}
	}	
</script>