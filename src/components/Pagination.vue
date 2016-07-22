<template>
	<div class="vue-pagination">
		<ul class="inline clearfix">
			<li><a href="javascript:;" v-on:click="prevPage"><</a></li>
			<li v-for="n in pageNum"><a href="javascript:;" v-bind:class="{'active': page == n+1}" v-on:click="pageChange(n+1)" v-on:click="pageChange()">{{n+1}}</a></li>
			<li><a href="javascript:;" v-on:click="nextPage()">></a></li>
		</ul>
		<span class="total">Total: {{pageNum}}</span>
	</div>
</template>
<script type="text/javascript">
	
export default {
	data(){
		return {
			page: this.$route.params.page,
			totalNum: this.$parent.totalNum,
			perPagenNum: this.$parent.perPagenNum,
			pageNum: 0
		}
	},
	ready(){
	},
	methods: {
		pageChange(n) {
			this.handleChange(n);
		},
		prevPage(){
			if(this.page === 1) return;
			let n = +this.page-1;
			this.handleChange(n);
		},
		nextPage(){
			if(this.page === this.pageNum) return;
			let n = +this.page+1;
			this.handleChange(n);
		},
		handleChange(n){
			this.$router.go({path: `/list/page/${n}`})
			this.page = n;
			this.$parent.pageChange();
		}
	},
	events:{
		'getTotalNum': function (num) {
			this.totalNum = num;
			this.pageNum = Math.round(num/this.perPagenNum);
	    }
	}
}
</script>
<style lang="less" scoped>
	.vue-pagination{
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translate(-50%,0);
		text-align: center;
		margin: 60px 0;
		ul.inline{
			display: inline-block;
			li{
				a{
					display: inline-block;
					min-width: 1.9em;
					padding: .25em 0;
				}
				a:hover{
					border-radius: .2em;
					box-shadow: 0 0 2px rgba(0,0,0,0.3);
				}
				.active{
					font-weight: 700;
					color: #42b983;
				}
			}
		}
		.total{
		    vertical-align: 7px;
		    margin-left: 40px;
		}
	}	
</style>