import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'
import Login from './views/login/index.vue'
import Mine from './views/home/mine.vue'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '',
      component: Mine
    },
    {
      path: 'comment',
      component: () =>
                        import('./views/comment/index.vue')
    },
    {
      path: 'material',
      component: () =>
                        import('./views/material')
    },
    {
      path: 'articles',
      component: () =>
                        import('./views/articles')
    },
    {
      path: 'publish',
      component: () =>
                        import('./views/publish')
    },
    {
      path: 'publish/:articlesId',
      component: () =>
                        import('./views/publish')
    }
    ]
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login

  }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
