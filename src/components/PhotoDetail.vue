<template>
    <div class="mask">
        <p>123</p>
        <a class="pull-right" v-link="{path:'/photo'}">x</a>
    </div>
</template>
<style>
    .mask{
        position: absolute;
        background-color: #ccc;
        width: 100vw;
        height:100vh;
        top:0;
        left: 0;
        z-index: 100;
    }
</style>
