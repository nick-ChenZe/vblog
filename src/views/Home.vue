<template>
    <main class="home-view row">
        <img src="/lib/assets/pizza.gif" class="pull-right">
        </img>
        <nav-component class="nav"></nav-component> 
    </mian>
</template>
<style lang="less" scoped>
  	.home-view{
      background-color: #F4F2F0;
      height: 100vh;
      &>img{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      max-width: 400px;
    }
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
