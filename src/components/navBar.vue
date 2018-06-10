<template>
  <div>
    <tabbar style='position:fixed'>
      <tabbar-item :selected="$route.path == '/search'"  link="/search">
        <!-- <img slot="icon" src="../assets/shouye@2x.png"> -->
        <!-- <img slot="icon" src="../assets/shou@2x.png"> -->
        <span slot="icon" class="bar_search_icon"></span>
        <span slot="label">搜索</span>
      </tabbar-item>
      <tabbar-item :selected="$route.path == '/login'" link="/login">
        <!-- <img slot="icon" src="../assets/me@2x.png" > -->
        <!-- <img slot="icon" src="../assets/i@2x.png" > -->
        <span slot="icon" class="bar_login_icon"></span>
        <span slot="label">{{nickName}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem} from 'vux'

export default {
  mounted(){
    this.user=JSON.parse(localStorage.getItem('_user'))
    if(this.user){
      this.nickName=this.user.username
    }
  },
  data () {
    return {
      user:{},
      nickName:'登录'
    }
  },
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>
<style lang="less">
    .bar_search_icon,.bar_login_icon{
      display: inline-block;
      width: 64/40rem;
      height: 64/40rem;
    }
    .bar_search_icon{
      background: url('../assets/shouye@2x.png') no-repeat center;
      background-size:100%;
    }
    .bar_login_icon{
      background: url('../assets/me@2x.png') no-repeat center;
      background-size:100%;
    }
    .weui-bar__item_on{
      span{
        color:#53669f;

      }
      .bar_search_icon{
        background: url('../assets/shou@2x.png') no-repeat center;
        background-size:100%;
      }
      .bar_login_icon{
        background: url('../assets/i@2x.png') no-repeat center;
        background-size:100%;
      }
    }
    .weui-tabbar__item span{
      display:inline-block;
    }
</style>