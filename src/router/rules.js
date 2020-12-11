import store from '../store'

export default function (to, from, next) {
  if (!store.state.database.initialized) {
    store.commit('database/init')
  }

  if (!store.state.user.initialized) {
    store.commit('user/init')
  }

  if (store.state.user.authenticated && to.matched.some(record => record.meta.requiresAuth)) {
    next()
  } else if (store.state.user.authenticated && !to.matched.some(record => record.meta.requiresAuth)) {
    next({ path: '/' })
  } else if (!store.state.user.authenticated && to.matched.some(record => record.meta.requiresAuth)) {
    next({ path: '/login' })
  } else {
    next()
  }
}