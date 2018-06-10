<template>
  <div class="page loginPage">
    <!-- <div class="loginCont"> -->
      <div class="loginPaddingBox">
         <p class="loginText">Hello</p>
         <group class='loginMain'>
            <x-input  class='inputbox'  placeholder="用户名" required v-model="user.username"></x-input>
            <x-input class='inputbox code' v-model="user.pwd" required  placeholder='密码'>
              <!-- <x-button slot="right" mini @click.native="getCodeFn()" v-bind:class="{'sending': sending}">{{codeTip}}</x-button> -->
            </x-input>
            <x-button class='loginBtn' mini v-bind:class="user.username==''|| user.pwd==''? 'err': ''" @click.native="loginFn">登录</x-button>
            <x-button class='registBtn' mini  @click.native="registFn">注册</x-button>
         </group>
       </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {  Group, XInput,XButton,Popup,TransferDom,XDialog} from 'vux'
import navBar from '@/components/navBar'
// var url = require('aUrl')
export default {
  directives: {
    TransferDom
  },
  mounted(){
    let self=this;
  },
  data () {
    return {
      user:{
        username:'',
        pwd:'',
      },
    }
  },
  beforeDestroy:function(){
    this.timer && clearInterval(this.timer);
  },
  methods:{
    
    loginFn:function(){
      this.$http.post('/api/users/singin',this.user)
        .then((res) => {
          // 响应成功回调
          console.log(res)
          if(res.data.status=='0'){
             localStorage.setItem("_user", JSON.stringify(res.data.user));
            this.$router.replace({path:'/search'})
          }else{
            this.$vux.toast.text(res.data.msg, 'center')
          }
        })
        .catch((reject) => {
          console.log(reject)
        });
    },
    registFn:function(){
      let param={
        username:this.user.username,
        pwd:this.user.pwd
      }
      this.$http.post('/api/users/singup',{user:param})
        .then((res) => {
          // 响应成功回调
          if(res.data.status=='0'){
            this.$vux.toast.text(res.data.msg, 'center')
            setTimeout(function(){
              this.$router.replace({path:'/login'})
            },1000)
          }
          if(res.data.status=='1'){
            this.$vux.toast.text(res.data.msg, 'center')
          }
          
        })
        .catch((reject) => {
          console.log(reject)
        });
    }
  },
   components: {
    Group,
    XInput,
    XButton,navBar
  }
}

</script>
<style scoped lang="less">
    .dialogUnBox{
      font-size: 30/40rem;
      padding: 30/40rem;
    }
    .dialogSureBtn{
      margin: 1rem;
      padding: 10/40rem 0;
      width: 85%;
      background-color: #38446A!important;
      color: #fff;
      font-size: 30/40rem;
    }
    .loginPage{
      background-color: #fff;
      position: relative;
      z-index:999;
    }
    .loginPaddingBox{
      padding: 0 40/40rem;
      height: 78%;
    }
    .loginText{
      font-size: 66/40rem;
      margin: 120/40rem 0 152/40rem;
    }
    .loginTip{
      color: #A1A1A1;
      font-size: 30/40rem;
    }
    .inputbox{
      padding:10/40rem 0;
      &.btm1px{
        border-bottom: 1px solid #9ca2b5;
      }
    }
    .dealBox{
      color: #999;
      span{
        color: #576AA3;
      }
      margin-top: 20/40rem;;
      font-size: 24/40rem;
    }
    .loginBtn,.registBtn{
      background-color: #38446A!important;
      color: #fff;
      margin-top: 100/40rem;
    }
    .loginBtn.err {
      background-color: #b2b2b2!important;
    }
    .loginWxBtn{
      font-size: 28/40rem;
      color: #999;
      img{
        width: 54/40rem;
        height: 45/40rem;
        vertical-align: middle;
        margin-right: 10/40rem;
      }
      text-align:center;
    }
    .loginCont{
      height: 85%;
    }
    .loginByWx{
      /*position: absolute;
      bottom: 50/40rem;*/
      text-align: center;
      left: 0;
      right: 0;
    }
    .watch{
      font-size: 30/40rem;
      margin-top: 20/40rem;
      height: 1.5rem;
      line-height: 1.5rem;
      text-align: right;
    }
</style>
<style lang='less'>
  .page.loginPage{
    .weui-input{
      font-size: 28/40rem;
      line-height: 1;
      padding: 20/40rem 0;
    }
    .weui-btn{
      padding: 0 80/40rem;
      &.sending{
        color: #999;
      }
    }
    .weui-btn:after{
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
  .dialogUnBox .weui-dialog{
    padding:1rem 1rem 20/40rem 1rem;
    border-radius: 10/40rem;
    width: 75%;
  }
  .loginMain  .weui-cell:before{
    left:0;
  }
  .loginMain .weui-cells:after{
    border-bottom:none;
  }
</style>