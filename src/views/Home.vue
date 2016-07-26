<template>
    <main class="home-view both-center">
        <nav-component class="nav"></nav-component> 
    </mian>
</template>
<style lang="less" scoped>
  	.home-view{
      width: 100%;
      height: 100%;
      background: url(/lib/assets/pizza.gif) no-repeat;
      background-position: 100% 0;
      box-shadow: 0 0 6px rgba(0,0,0,.3);
      background-color: #F4F2F0;
  	}
</style>
<script type="text/javascript">
    import navComponent from '../components/nav-component.vue';
	export default{
        components:{
            navComponent
        }
    }
</script>
