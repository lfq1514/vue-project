import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    redirect:"/home/goods/goodsList",
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue'),
    children: [
      {
        path: 'goods',
        name: 'Goods',
        component: () => import(/* webpackChunkName: "home" */ '../components/goods/Goods.vue'),
        children:[
          {
            path: 'goodsList',
            name: 'GoodsList',
            component: () => import(/* webpackChunkName: "home" */ '../components/goods/GoodsList.vue'),
          },
          {
            path: 'goodsGroup',
            name: 'GoodsList',
            component: () => import(/* webpackChunkName: "home" */ '../components/goods/goodsGroup.vue'),
          },
          {
            path: 'importData',
            name: 'importData',
            component: () => import(/* webpackChunkName: "home" */ '../components/goods/importData.vue'),
          },


        ]
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import(/* webpackChunkName: "about" */ '../components/test/Demo.vue'),
      },
      {
        path: 'chart',
        name: 'Chart',
        redirect:"/chart/echart",
        component: () => import(/* webpackChunkName: "chart" */ '../components/chart/Chart.vue'),
        children:[
          {
            path: 'echart',
            name: 'Echart',
            component: () => import(/* webpackChunkName: "chart" */ '../components/chart/Echart.vue'),
          },
          {
            path: 'canvas',
            name: 'Canvas',
            component: () => import(/* webpackChunkName: "chart" */ '../components/chart/Canvas.vue'),
          },
          {
            path: 'echartMap',
            name: 'Canvas',
            component: () => import(/* webpackChunkName: "chart" */ '../components/chart/echart-map.vue'),
          },

        ]
      },

    ]
  },


]

const router = new VueRouter({
  routes,
  mode: 'hash',
  // base: '/h/activity',
})

export default router
