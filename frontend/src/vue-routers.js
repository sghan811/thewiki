import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/views/Index'
import Viewpost from '@/views/Post'
import Loginpage from '@/views/login'
import writepage from '@/views/write'
import newspage from '@/views/news'
import serverspage from '@/views/servers'
import eventspage from '@/views/events'
import issuespage from '@/views/issues'

const routes = [
  {
    path: '/',
    component: PageHome,
  },
  {
    path: '/detail',
    component: Viewpost
  },
  {
    path: '/login',
    component: Loginpage
  },
  {
    path: '/write',
    component: writepage
  },
  {
    path: '/news',
    component: newspage
  },
  {
    path: '/servers',
    component: serverspage
  },
  {
    path: '/events',
    component: eventspage
  },
  {
    path: '/issues',
    component: issuespage
  }
  // },
  // {
  //   path: '/about',
  //   name: 'PageAbout',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/PageAbout.vue')
  // },
  // {
  //   path: '/board/list',
  //   name: 'BoardList',
  //   component: BoardList
  // },
  // {
  //   path: '/board/detail',
  //   name: 'BoardDetail',
  //   component: BoardDetail
  // },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router