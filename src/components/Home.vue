<template>
    <div>
        <div class="code">
            <h1><span style="color: #97C774">H</span><span style="color: #B63E98">e</span><span style="color: #D18E62">l</span><span style="color: #DB3E41">l</span><span style="color: #1BABA5">o</span>, I speak code.</h1>
            <h2>/* Engineer */</h2>
        </div>
    </div>
</template>
<style lang="less">
    .code {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;

        h1 {
            position: relative;
            font-size: 3vw;
            color: #4285f4;
        }
        h1:after {
            content: '';
            height: 50%;
            width: 2px;
            background: #666;
            position: absolute;
            display: block;
            right: -1vw;
            top: 50%;
            transform: translate(0,-50%);
            animation: blink 1.2s linear infinite;
        }
        h2 {
            margin-top: 10%;
            font-size: 2vw;
            color: #59b75c;
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
</script>
