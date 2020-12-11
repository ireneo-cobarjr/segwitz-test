import Vue from 'vue'
import Vuex from 'vuex'

import database from './database'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    database,
    user
  }
})
