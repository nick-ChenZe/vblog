<template>
	<div>
		<section>
			<figure>
				<img src="/lib/assets/avatar.jpeg">
				<figcaption>
					<h4>竖八不正</h4>
					<a href="">@nick-ChenZe</a>
				</figcaption>
			</figure>
		</section>
		<section>
			<p>
				一二三四五六一二三四五六一二三四五六一二三四五六一二三四五六一二三四五六
				一二三四五六一二三四五六一二三四五六一二三四五六一二三四五六一二三四五六一二三四五六一二三四五六一二三四五六一二三四五六一二三四五六一二三四五六
			</p>
		</section>
	</div>
</template>
<script type="text/javascript">
	export default{
		name: 'intro'
	}
</script>
<style lang="less" scoped>
	div{
		display: flex;
		padding: 60px; 
		section{
			border-top: 1px solid #ddd; 
			flex: 1;
			text-align: center;
			p{
				margin-top: 60px;
				text-align: left;
				text-indent: 2em;
				line-height: 1.6;
				color: #999;
			}
		}
		figure{
			display: inline-block;
			margin-top: 60px;
			height: 100px;
			width: 240px;
			img,figcaption{
				float: left;
			}			
			img{
				width: 100px;
				height: 100px;
				border-radius: 100%;
			}
			figcaption{
				padding: 20px 10px;
				a{
					line-height: 3em;
				}
			}
		}
	}
</style>