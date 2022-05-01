import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/components/PageHome'
import PageThreadShow from '@/components/PageThreadShow.vue'
import PageNotFound from '@/components/PageNotFound.vue'
import sourcrData from '@/data.json'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PageHome
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: PageThreadShow,
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
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
