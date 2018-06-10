<template>
	<div>
		<div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down downstyle xxxxxx">
			<!-- <i class="loading-gif" v-show="statusDown === 'up'|| statusDown === 'loading'"></i> -->
			<span v-show="statusDown === 'default'"></span>
			<span v-show="statusDown === 'down'">↑ 下拉刷新</span>
			<span v-show="statusDown === 'up'">↓ 松开刷新</span>
			<span v-show="statusDown === 'loading'">
			<i class='min-loaging'></i>
			正在刷新</span>
		</div>
		<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up upstyle xxxxxx" v-bind:class="{'upstatus': statusUp === 'stop' || statusUp === 'up'}">
			<i class="loading-gif" v-show="statusUp === 'down' || statusUp === 'loading'"></i>
			<i class="loading-gif" v-show="statusUp === 'disabled'"></i>
			<span v-show="statusUp === 'default'"></span>
			<span v-show="statusUp === 'down'">松开加载</span>
			<span v-show="statusUp === 'loading'">正在加载</span>
			<span v-show="statusUp === 'disabled'">没有更多</span>
    </div>
	</div>
</template>
<script>
	export default{
		props:{
			statusUp:{
				type: String,
				default:'default'
			},
			statusDown:{
				type: String,
				default:'default'
			},
		},
		data(){
			return {
				noPage:true, //
				flag:0, //标识监听的次数
			}

		},
		mounted(){
		},
		watch:{
			statusUp(val){
				if(this.flag==1 && val==='disabled'){
					this.noPage=true
				}else{
					this.noPage=false
				}
				this.flag++
			}
		}
	}
</script>
<style scoped lang='less'>
	.loading-gif {
	    margin-left: 42%;
	    display: block;
	    width: 3rem;
	    height: 3rem;
	    /*background: url('../assets/img/blank/isBottom.png') 0 0 no-repeat;
	    background-size: 100%;*/
	}
	.min-loaging{
		display: inline-block;
		width: 0.8rem;
	    height: 0.8rem;
	    vertical-align: middle;
	    background: url('../assets/img/blank/loading.gif') 0 0 no-repeat;
	    background-size: 100%;
	}
	.downstyle{
		position: absolute;
		width: 100%;
		top: -4.4rem;
		text-align: center;
		font-size: 28/40rem;
	}
	.upstyle{
		position: absolute;
		width: 100%;
		bottom: -4.4rem;
		text-align: center;
		font-size: 28/40rem;
		&.upstatus{
			bottom:  -66/40rem;
		}
	}
</style>
