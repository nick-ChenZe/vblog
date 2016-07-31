<template>
	<section class="profile">
		<img src="/lib/assets/avatar.jpeg">
		<div class="intro">
			<h2>nick-ChenZe	</h2>
			<h4>
				一二三四五六七八九十
			</h4>
		</div>
		<div class="link">
	        <a href="/">Home
	        </a>
	        <a href="/#!/blog">Blog
	        </a>
	        <a href="">CV</a>
		</div>
		<div class="arch" align="left">
			<h4><i class="fa fa-briefcase"></i>ARCHIVES</h4>
			<ul>
				<li><i class="icon"></i>JULY<span class="pull-right">22</span></li>
				<li><i class="icon"></i>APRIL<span class="pull-right">33</span></li>
				<li><i class="icon"></i>MARCH<span class="pull-right">44</span></li>
				<li><i class="icon"></i>2016<span class="pull-right">3</span></li>
			</ul>
		</div>
		<div class="social">
			<ul>
				<li>
					<span class="fa fa-weibo"></span>
				</li>
				<li>
					<span class="fa fa-weixin"></span>
				</li>
				<li>
					<span class="fa fa-github"></span>
				</li>
				<li>
					<span class="fa fa-twitter"></span>
				</li>
			</ul>
		</div>
		<footer><small>Power by <a href="https://github.com/nick-ChenZe/vblog">Vblog</a> </small></footer>
	</section>
</template>
<style lang="less" scoped>	
	.profile{
		position: relative;
		overflow: hidden;
		text-align: center;
		height: 100vh;
		background-color: #161F26;
		.social{
			padding: 0 40px;
			ul{
				margin-top: 20px;
				display: flex;
				width: 100%;
			}
			li{
				flex: 1;
				text-align: center;
				span{
					display: inline-block;
					width: 40px;
					height: 40px;
					border-radius: 100%;
					line-height: 40px;
					font-size: 24px;
					background-color: #ddd;
					color: white;
					transition: .5s all ease-out;
					&:hover{
						border-radius: .3em;
					}
					&.fa-weibo{
						background-color:#e6162d;
					}
					&.fa-weixin{
						background-color:#25a310;
					}
					&.fa-github{
						background-color:#e5e5e5;
						color: #333;
					}
					&.fa-twitter{
						background-color:#1da1f2;
					}
				}
			}
		}
		.intro{
			h2{
				margin: -.5em 0 1em;	
				color: #fafafa;
				transition: all .5s linear;
			}
			h4{
				position: relative;
				color: #fafafa;
				display: inline-block;
				padding-bottom: .6em;
				&:before{
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					width: 0;
					display: block;
					height: 30px;
					border-bottom: 2px solid #2981FF;
					transition: all .5s linear;
				}
				&:hover:before{
					width: 100%;
				}
			}
		}
		.arch{
			padding: 10px 20px;
			h4{
				i{
					margin-right: .5em;
					border: 2px solid #34495e;
					border-radius: 100%;
					padding: .5em .4em .4em .45em;
				}
				margin: 1.5em 0;
				color: #EF931A;
			}
			li{
				line-height: 3em;
				font-size: 12px;
				background-color: #19242A;
				margin: .5em 0;
				cursor: pointer;
				&:hover{
					background-color: #2981FF; 
					color: white;
					.icon{
						background-color: #fff;
						&:after{
						background-color: #EF931A;
						}
					}
				}
				.pull-right{
					margin-right: 2em;
					font-weight: 700;
				}
				.icon{
					position: relative;
					background-color: #161F26;
					border-radius: 100%;
					display: inline-block;
					width: 14px;
					height: 14px;
					margin-top: 4px;
					vertical-align: -2px;
					margin: 0 10px;
					&:after{
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%,-50%); 
						content: '';
						width: 10px;
						height: 10px;
						background-color: #34495e;
						border-radius: 100%;
					}
				}
			}
		}
		.link{
			padding: 20px;
			a{
				display: inline-block;
				width: 33%;
				line-height: 2em;
				position: relative;
				float: left;
				transition: .2s all ease-in;
				border-radius: .3em;
				&:hover{
					background-color: #2981FF;
					color: white; 
				}
				&:after{
					content: '';
					position: absolute;
					top: 50%;
					left: .5em;
					transform: translate(0,-50%);
					width: 4px;
					height: 4px;
					border-radius: 100%;
					background-color: #2981FF;
				}
			}
		}
		footer{
			position: absolute;
			bottom: 1em;
			width: 100%;
			a{
				font-weight: 900;
				padding: 0 1em;
				color: white;
			}
		}
	}
	img:hover+.intro h2,
	h2:hover{
		color: #2981FF !important;
	}
	img{
		display: inline-block;
		width: 120px;
		height: 120px;
		margin: 30px 0;
		border: 2px solid #666;
		border-radius: 100%;
	}
</style>
<script type="text/javascript">
	export default{
		components:{
			navComponent: require("./nav-component.vue")
		}
	}
</script>