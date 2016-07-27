<template>
	<div>
		<h1>Category</h1>
		<div class="tags">
			<span>20xx</span>
			<span>tags</span>
			<span>20xx</span>
			<span>tags</span>
			<span>20xx</span>
			<span>tags</span>
			<span>20xx</span>
			<span>tags</span>
			<span>20xx</span>
			<span>tags</span>
			<span>20xx</span>
			<span>tags</span>
			<span>20xx</span>
			<span>tags</span>
			<span>20xx</span>
			<span>tags</span>
		</div>
		<input-component></input-component>
	</div>
</template>
<script type="text/javascript">
	import inputComponent from "../components/input-component.vue"
	export default{
		components:{
			inputComponent
		}
	}
</script>
<style lang="less">
	.tags span{
		padding: .2em 1em;
		display: inline-block;
		background-color: #666;
		color: white;
		margin: .2em;
		border-radius: 20px;
	}
</style>