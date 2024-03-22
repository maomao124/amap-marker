import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const list = [];

for (let i = 0; i < 10; i++)
{
  list.push({
    path: '/view' + (i + 1),
    name: '/view' + (i + 1),
    component: () => import( '../views/View' + (i + 1) + '.vue')
  },)
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  ...list

]

const router = new VueRouter({
  routes
})
console.log(routes)
export default router
