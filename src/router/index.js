import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import rules from './rules'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(rules)

export default router
