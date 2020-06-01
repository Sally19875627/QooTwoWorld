import Vue from 'vue'
import Router from 'vue-router'
import qs from '@/pages/algorithm/quicksort/qs'
import index from '@/pages/index'
import defaultPage from '@/layout/default.vue'
import canvasPage from '@/pages/optimize/canvas'
import canvasNoCache from '@/pages/optimize/canvasNoCache'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [    
    {
    path: '/',
      name: 'default',
      component: defaultPage,
      redirect: '/index',
      children: [{
        path:'/index',
        component:index,
        name:index
      },{
        path:'/algorithm/qs',
        name:'qs',
        component:qs
      },{
        path:'/optimize/canvas',
        name:'canvas',
        component:canvasPage
      },{
        path:'/optimize/canvasNoCache',
        name:'canvasNoCache',
        component:canvasNoCache
      },{
        path:'/helloworld',
        name:'helloWorld',
        component:HelloWorld        
      }
      ]
    }
  ]
})
