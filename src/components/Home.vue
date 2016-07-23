<template>
    <div class="home-view">
        <div class="card">
            <div class="card-body">
                <div class="card-page front">
                    <ul class="front-list">
                        <li class="both-center">
                            <img class="avatar" src="../img/avatar.jpeg">
                        </li>
                        <li>
                            <span> > nick-ChenZe</span>
                            <span class="sub">Web Designer & Developer</span>
                        </li>
                    </ul>
                </div>
                <div class="back card-page">
                    <p>
                        <span class="slogan">大凡人生在世，须要得有一定宗旨，虽然说与时偕行，也须得一两根硬骨头；两个眼睛，也得要半开半闭，瞧瞧现在是什么世界。 </span>
                    </p>
                    <ul class="social-bar">
                        <li>
                            <a href="/#!/list/page/1" class="custom-tips" data-tips="博客">
                                <i class="fa fa-home"></i>
                            </a>
                        </li>
                        <li>
                            <a href="http://weibo.com/2064567411" class="custom-tips" data-tips="微博" target="_blank">
                                <i class="fa fa-weibo"></i>
                            </a>
                        </li>
                        <li>
                            <a href="" class="custom-tips" data-tips="微信">
                                <i class="fa fa-weixin"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/nick-ChenZe" class="custom-tips" data-tips="github" target="_blank">
                                <i class="fa fa-github"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    @import "../tips.less";
    .home-view{
        height: 100vh;
        width: 100vw;
        background-color: #42b983;
        display:flex;
        justify-content:center;
        align-items: center;
    }
    .card {
        position: absolute;
        width: 400px;
        height: 300px;
        perspective: 500px;
        .card-body {
            position: absolute;
            width: 100%;
            height: 100%;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
            transition: transform 1s;
            transform-style: preserve-3d;
        }
    }
    .card:hover .card-body {
        transform: rotateY( 180deg ) ;
        transition: transform 0.5s;
    }
    .front,
    .back {
        position: absolute;
        height: 100%;
        width: 100%;
        background: white;
        border-radius: 5px;
        backface-visibility: hidden;
    }
    .back {
        transform: rotateY( 180deg );
    }
    .card-page>ul.front-list{
        list-style: none;
        height: 100%;
    }
    .card-page.front li{
        height: 20%;
        text-align: center;
    }
    .card-page.front li:first-child{
        position: relative;
        height: 40%;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        margin-bottom: 18%;
    }
    .card-page.front span{
        display: inline-block;
        font-family: "Wawati TC",sans-serif;
        font-size: 27px;
        padding: 4px;
        width: auto;
        border-bottom: 2px solid #000;
        margin: 0 auto;
    }
    .card-page span.sub {
        color: #ccc;
        border: none;
        font-size: 22px;
    }
    .back p{
        height: 70%;
        line-height: 1.8em;
        color: white;
    }
    .back .slogan{
        padding: 4em 2em;
        display: inline-block;
        background-color: #023433;
        border-radius: 5px 5px 0 0;
        color: white;
    }
    .social-bar{
        width: 100%;
        height: 30%;
        display: flex;
        li{
            flex: 1;
            width: 100%;
            display: flex;
            text-align: center;
        }
    }
    .social-bar a{
        width: 100%;
        font-size: 40px;
        line-height: 90px;
        color: darkseagreen;
        &:before{
            line-height: 1.5;
            color: white;
        }
    }
    .both-center{
        background-color: #023433; 
    }
    .avatar{
        position: relative;
        width: 140px;
        top: 60px;
        border-radius: 100%;
    }
    .code {
        position: absolute;
        top: 0%;
        left: 50%;
        transform: translate(-50%, 0%);
        text-align: center;

        h1 {
            position: relative;
            font-size: 3vw;
            color: #4285f4;
        }
        h1:after {
            content: '';
            height: 80%;
            width: 2px;
            background: #666;
            position: absolute;
            display: block;
            right: -1vw;
            top: 50%;
            transform: translate(0,-50%);
            animation: blink 1.2s linear infinite;
        }
        @-moz-keyframes blink {
            49% {
                background: transparent;
            }
            50% {
                background: #fff;
            }
            100% {
                background: #fff;
            }
        }
        @-webkit-keyframes blink {
            49% {
                background: transparent;
            }
            50% {
                background: #fff;
            }
            100% {
                background: #fff;
            }
        }
        @-o-keyframes blink {
            49% {
                background: transparent;
            }
            50% {
                background: #fff;
            }
            100% {
                background: #fff;
            }
        }
        @keyframes blink {
            49% {
                background: transparent;
            }
            50% {
                background: #fff;
            }
            100% {
                background: #fff;
            }
        }
    }
    
</style>
<script>
    export default{
        attached(){
            this.$root.hideHeader = true;
        }
    }
</script>
