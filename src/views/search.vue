
<template>
  <div class="page search">
    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      :auto-fixed='false'
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"></search>
    <div class="search_sort_box">  
      <x-button mini @click.native='showPice=true'>过滤价格</x-button>
      <x-button mini @click.native='sortFn' v-show='sortType'>降序↓</x-button>
      <x-button mini @click.native='sortFn' v-show='!sortType'>升序↑</x-button>
    </div> 
    <div class="scroll_wrap">
    <!-- @bottom-state-change="stateChange" -->
      <pull-to
        :top-load-method="refresh"
        :bottom-load-method="loadmore"
        >
        <div class="prod_box">
          <div class="prod_item" v-for='item in goodsList'>
            <p>{{item.pName}}</p>
            <p>{{item.salePrice | priceTwo}}</p>
            <p @click='delFn(item)'>删除</p>
          </div>
          <div class="prod_item goAddGood" >
            <router-link to="/addgood" >
              <p>+</p>
              <p>新增</p>
            </router-link>
          </div>
        </div>
      </pull-to>
    </div>
    <actionsheet v-model="showPice" :menus="menus2" @on-click-menu="click"></actionsheet>
    <navBar></navBar>
  </div>
</template>

<script>
import {XInput,Group,Cell,XButton,Search,Actionsheet,Scroller} from 'vux'
import PullHeaderFooter from '@/components/pullHeaderFooter'
import PullTo from '@/components/pullto/vue-pull-to';
import navBar from '@/components/navBar'
export default {
  mounted(){
     this.getGoods();
  },
  data () {
    return {
      title: '标题啊',
      goodsList:{},
      sortType:true,
      results: [],
      value: 'test',
      showPice:false,
      menus2: {
        menu1: '全部',
        menu2: '0-100',
        menu3: '100-200'
      },
      saleLever:0,
      items: [],
      page:1,
      pageSize:5,
      noNext:false,
      iconLink: '',
    }
  },
  methods:{
    refresh(loaded) {
      setTimeout(() => {
        this.page=1;
        this.sortType=true;
        this.saleLever=0;
        this.getGoods();
        loaded('done');
      }, 2000);
    },
    loadmore(loaded) {
        setTimeout(() => {
          this.page++;
          if(!this.noNext){
            this.getGoods();
          }
          loaded('done');
        }, 2000);
      },
    getGoods(){
      let param={
        sort:this.sortType ? 1:-1,
        searchText:this.value,
        saleLever:this.saleLever,
        page:this.page,
        pageSize:this.pageSize
      }
      let self=this;
      self.$http.get('/api/goods',{params:param})
        .then((response) => {
          // 响应成功回调
          if(this.page===1){
            this.goodsList=response.data.list
          }else{
            this.goodsList = [...this.goodsList, ...response.data.list]
          }
          if(response.data.list.length%this.pageSize!==0){
            this.noNext=true;
          }else{
            this.noNext=false;
          }
          
        })
        .catch((reject) => {
          console.log(reject)
        });
    },
    sortFn(){
      this.sortType=!this.sortType;
      this.getGoods();
    },
    click(data,a){
      this.saleLever=data.slice(4,data.length)-1;
      this.getGoods();
    },
    delFn(item){
      console.log(item.pid)
      this.$http.post('/api/goods/del',{pid:item.pid,pName:item.pName})
        .then((res) => {
           // 响应成功回调
          if(res.data.status=='0'){
            this.$vux.toast.text(res.data.msg, 'center')
            location.reload();
          }
          
        })
        .catch((reject) => {
          console.log(reject)
        });
    },
    setFocus () {
      this.$refs.search.setFocus()
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      console.log('on-change', val)
      this.results = val ? getResult(this.value) : []
    },
    onSubmit () {
      this.$refs.search.setBlur()
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
    }
  },
  components: {
     XInput,Group,Cell,XButton,Search,Actionsheet,Scroller,PullHeaderFooter,PullTo,navBar
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .prod_box{
    display:flex;
    flex-flow:row wrap;
    justify-content:space-between;
    margin-bottom: 1rem;
  }
  .prod_item{
    width:49%;
    height:3rem;
    padding:2rem 0;
    background:#e2e2e2;
    margin-top:0.5rem;
  }
  .search_sort_box{
    text-align: right;
    padding: 30/40rem;
  }
  .goAddGood a{
    color:#53669f;
    text-decoration:none;
  }
</style>
<style type="text/css">
   .search_sort_box .weui-btn + .weui-btn{
    margin-top: 0;
   }
</style>

