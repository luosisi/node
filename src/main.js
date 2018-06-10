// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

import axios from 'axios'
import VueScroller from 'vue-scroller'
//import Pull from 'vue-pull-to'
Vue.use(VueScroller)
//Vue.use(Pull)
Vue.prototype.$http = axios

Vue.config.productionTip = false

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
            }
        }
    },
    methods: {
        //分页
        getCurrentValue:function(value){
          this.pullupStatus = value.pullupStatus;
          this.pulldownStatus = value.pulldownStatus;
        },
        setTitle: function(title){
            document.title = title;
            var iframe = document.createElement('iframe');
            iframe.style.visibility = 'hidden';
            iframe.style.width = '1px';
            iframe.style.height = '1px';
            iframe.onload = function () {
                setTimeout(function () {
                    document.body.removeChild(iframe);
                }, 0);
            };
            document.body.appendChild(iframe);
        }
    },

})

Vue.filter('priceTwo', function (value) {
  if(typeof value ==  'string'){
    value = parseFloat(value);
  }
  if(!value) value = 0;
  return '¥'+value.toFixed(2);
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
