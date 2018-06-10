
<template>
  <div class="page search">
    <!-- <group>
      <cell :title="title" value="value"></cell>
    </group> -->
    <group>
      <x-button mini @click='sortFn' v-if='sortType==-1'>降序</x-button>
      <x-button mini @click='sortFn' v-else>升序</x-button>
    </group>
    <div class="prod_box">
      <div class="prod_item" v-for='item in goodsList'>
        <p>{{item.pName}}</p>
        <p>{{item.salePrice | priceTwo}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {XInput,Group,Cell,XButton} from 'vux'
export default {
  mounted(){
    this.getGoods();
  },
  data () {
    return {
      title: '标题啊',
      goodsList:{},
      sortType:-1
    }
  },
  methods:{
    getGoods(){
       // 获取已有账号密码
      this.$http.get('/api/goods')
        .then((response) => {
          // 响应成功回调
          this.goodsList=response.data.list
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
  .prod_box{
    display:flex;
    flex-flow:row wrap;
    justify-content:space-between;
  }
  .prod_item{
    width:49%;
    height:3rem;
    padding:2rem 0;
    background:#e2e2e2;
    margin-top:0.5rem;
  }
</style>

