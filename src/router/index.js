import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component (resolve) {require(['@/views/search'], resolve)}
    },{
      path: '/search',
      name: 'search',
      component (resolve) {require(['@/views/search'], resolve)}
    },{
      path: '/temp3',
      name: 'temp3',
      component (resolve) {require(['@/views/temp3'], resolve)}
    },{
      path: '/addgood',
      name: 'addgood',
      component (resolve) {require(['@/views/addGoods'], resolve)}
    },{
      path: '/login',
      name: 'login',
      component (resolve) {require(['@/views/login'], resolve)}
    },
  ]
})
