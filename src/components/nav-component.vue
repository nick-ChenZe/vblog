<template>
	<nav>
	    <ul class="social-bar clearfix hidden-xs"  
	    	v-bind:class="[isDrop ? 'drop' : 'inline']">
		    <li>
		        <a href="/">Home
		        </a>
		    </li>
		    <li>
		        <a href="/#!/blog">Blog
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
		        <a href="/CV/index.html">
		        	CV
		        </a>
		    </li>
		</ul>
		<button type="button" 
				v-on:click="toggleDrop()" 
				class="btn btn-default visible-xs-block pull-right">
			<i class="glyphicon glyphicon-menu-hamburger"></i>
		</button>
	</nav>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				isDrop: false
			}
		},
		methods:{
			toggleDrop(){
				this.isDrop = !this.isDrop;
			}
		}
	}
</script>
<style lang="less">
	@default:#DF5337;
	nav{
		display: block;
		z-index: 99;
		.btn{
			display: inline-block;
			margin: 1em;
			border:none;
			padding: none;
			background-color: transparent;
			width: 40px;
			height: 40px;
		}
		a{
			padding: .5em 1em;
			text-decoration: none;
			color: #999;
			&:hover{
				color: @default;
				text-decoration: none;
			}
		}
	}
	.inline li {
		a{
			display: inline-block;
			position: relative;
			float: left;
			&:after{
				display: inline-block;
				position:absolute;
				content: '';
				width: 0;
				height: 100%;
				border-bottom: 4px solid @default;
				top: 0;
				left: 50%;
				transform: translate(-50%,0);
				transition: all .3s ease-out;
			}
			&:hover:after{
				width: 60%;
			}
		}
	}
	.drop{
		position: absolute;
		float: right;
	    right: 20px;
    	top: 60px;
		display:block !important;
		padding: 0;
		border-radius: .5em;
		box-shadow: 0 0 20px rgba(0,0,0,.15);
		li{
			width: 140px;
			text-align: center;
			padding: .5em 1em;
			background-color: white;
			&:hover{
				background-color: #ddd;
			}
		}
		li:first-child{
			border-radius: .5em .5em 0 0;
		}
		li:last-child{
			border-radius: 0 0 .5em .5em;
		}
	}
</style>