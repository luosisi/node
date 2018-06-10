// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { AlertPlugin, ConfirmPlugin,ToastPlugin, AjaxPlugin,LoadingPlugin } from 'vux'

Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(AjaxPlugin)

Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$http = axios
//Vue.use(axios)
axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
//axios.defaults.baseURL = '你的接口地址';   //配置接口地址


Vue.mixin({
  data: function() {
        return {
            //分页
            pullupStatus:'default',
            pulldownStatus:'default',
            pulldefaultConfig:{
              height: 100,
              content: "",
              upContent: "",
              loadingContent: "",
              downContent: ""
            },
            page: {
                totalpage: 1,
                currPage: 1,
                limit: 5,
                hasNext: true
            },
        }
    },
    methods: {
        //分页
        getCurrentValue:function(value){
          this.pullupStatus = value.pullupStatus;
          this.pulldownStatus = value.pulldownStatus;
        }
    }    
})
// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
    config => {
        // if (token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        //     config.headers.Authorization = token;
        // }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 这里写清除token的代码
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })
            }
        }
        return Promise.reject(error.response.data) 
    }
);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
