import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/HomePage.vue'
import ThreadShow from '@/pages/ThreadShow.vue'
import NotFound from '@/pages/NotFound.vue'
import sourcrData from '@/data.json'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
    // route guard
    beforeEnter (to, from, next) {
      const threadExists = sourcrData.threads.find(thread => thread.id === to.params.id)
      if (threadExists) {
        return next()
      } else {
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash
        })
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
