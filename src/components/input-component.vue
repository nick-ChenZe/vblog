<template>
<section class="clearfix component"> 
    <div class="search col-xs-8">
      <div class="row">
         <i class="icon icon-search"></i>
         <input placeholder="disabled" disabled></input> 
      </div>
    </div>
    <div class="col-xs-3">
      <button type="button" class="btn btn-default btn-sm">搜索</button>
    </div>
</section>
</template>
<style lang="less" scoped>
  .component{
    padding: 10px 0;   
  }
  .search{
    position: relative;
    // .row{
    //   padding: 10px 0;
    // }
    .icon{
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
    }
    input{
      border-width: 0 0 2px 0;
      width: 100%;
      text-indent: 30px;
      font-size: 14px;
      outline: none;  
      background-color: transparent;
    }
  }
</style>