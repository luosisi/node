<template>
  <div class="collection">
    <h1>goods表</h1>
    <div class="scroll-wrap">

      <scroller lock-x
        :pullup-config="pulldefaultConfig"
        use-pullup
        height="100%"
        :pullup-status="pullupStatus"
        @on-pullup-loading="loadMore"
        ref="detailScroller"
        use-pulldown
        @on-pulldown-loading="refresh"
        :pulldown-config="pulldefaultConfig"
        :pulldown-status="pulldownStatus"
        @input="getCurrentValue">

        <div>
          <flexbox :gutter="0" wrap="wrap" class='collect'>
            <!-- <flexbox-item>
              <span>pImg</span>
            </flexbox-item> -->
            <flexbox-item>
              <span>pName</span>
            </flexbox-item>
            <flexbox-item>
              <span>pid</span>
            </flexbox-item>
            <flexbox-item>
              <span>salePrice</span>
            </flexbox-item>
          </flexbox>
          <flexbox :gutter="0" wrap="wrap" v-for='item in userList' class='collect'>
            <!-- <flexbox-item>
              <span>{{item.pImg}}</span>
            </flexbox-item> -->
            <flexbox-item>
              <span>{{item.pName}}</span>
            </flexbox-item>
            <flexbox-item>
              <span>{{item.pid}}</span>
            </flexbox-item>
            <flexbox-item>
              <span>{{item.salePrice}}</span>
            </flexbox-item>
          </flexbox>
          
        </div>
        <pull-header-footer :status-up="pullupStatus" :status-down="pulldownStatus"></pull-header-footer>
      </scroller>
    </div>
    
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,Scroller} from 'vux'
import PullHeaderFooter from '@/components/pullHeaderFooter'
export default {
  name: 'HelloWorld',
  mounted() {
    this.init(1)
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userList:[],
    }
  },
  methods:{
    init(page) {
        let self = this
        if (page === 1) {
          self.userList = []
        }
        self.$http.get('/api/getGoods' + '?page=' + page + '&pageSize=10&sort=1')
          .then((res)=> {
            console.log(res)
            if (res.data.status == 0) {
              self.userList = [...self.userList, ...res.data.result.list]
              self.page.totalpage = res.data.data.totalPage;
              if (res.data.data.hasNext) {
                self.page.currPage++;
              }
              self.page.hasNext = res.data.data.hasNext;
            }else{
              this.$vux.toast.text('查询失败')
            }
            self.$nextTick(() => {
              self.$refs.detailScroller.donePullup();
              if (!self.page.hasNext) {
                self.$refs.detailScroller.disablePullup();
              }
              if (res.data.data.currPage == 1) {
                self.$refs.detailScroller.reset({top: 0}, 500, 'ease');
              }
            });
          })
      },
      loadMore() {
        let self = this;
        if (self.page.hasNext) {
          setTimeout(() => {
            self.init(self.page.currPage)
          }, 2000)
        }
      },
      refresh() {
        let self = this;
        setTimeout(() => {
          self.init(1);
        }, 2000)
      },
  },
   components: {
    Flexbox, FlexboxItem , Scroller,PullHeaderFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .collection {
    .collect{
      line-height: 70/40rem;
    }
  }
</style>
