
<template>
  <div class="page search">
    <group>
      <x-input title="书名" v-model="good.pName"></x-input>
      <x-input title="价格" v-model="good.salePrice"></x-input>
    </group>
    <x-button  @click.native='saveGoods' class='add_good_btn'>新增</x-button>
  </div>
</template>

<script>
import {XInput,Group,Cell,XButton} from 'vux'
export default {
  mounted(){
  },
  data () {
    return {
      good:{},
    }
  },
  methods:{
    saveGoods(){
      this.good.pid=parseInt(Math.random()*1000)
       // 获取已有账号密码
      this.$http.post('/api/goods/save',{good:this.good})
        .then((res) => {
          // 响应成功回调
          if(res.data.status=='0'){
            this.$vux.toast.text(res.data.msg, 'center')
            setTimeout(()=>{
              this.$router.replace({path:'/search'})
            },1000)
          }
        })
        .catch((reject) => {
          console.log(reject)
        });
    },
    sortFn(){

    }
  },
  components: {
     XInput,Group,Cell,XButton
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .add_good_btn{
    background:#53669f;
    color:#fff;
    margin-top:3rem;
  }
</style>

