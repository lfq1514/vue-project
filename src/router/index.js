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
    component: () => import(/* webpackChunkName: "about" */ '../views/login/login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    redirect:"/home/goods/goodsList",
    component: () => import(/* webpackChunkName: "about" */ '../views/home/Home.vue'),
    children: [
      {
        path: '/home/goods',
        name: 'Goods',
        component: () => import(/* webpackChunkName: "about" */ '../components/goods/Goods.vue'),
        children:[
          {
            path: '/home/goods/goodsList',
            name: 'GoodsList',
            component: () => import(/* webpackChunkName: "about" */ '../components/goods/GoodsList.vue'),
          },
          {
            path: '/home/goods/goodsGroup',
            name: 'GoodsList',
            component: () => import(/* webpackChunkName: "about" */ '../components/goods/goodsGroup.vue'),
          },


        ]
      }

    ]
  },


]

const router = new VueRouter({
  routes,
  mode: 'hash',
  // base: '/h/activity',
})

export default router
