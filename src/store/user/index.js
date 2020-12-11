export default {
  namespaced: true,

  state: () => ({
    initialized: false,
    authenticated: false,
    user: {
      first_name: '',
      last_name: '',
      city: '',
      state: ''
    }
  }),

  mutations: {
    login (state, user) {
      state.user = user
      state.authenticated = true
      localStorage.setItem('user', JSON.stringify(state))
    },

    logout (state) {
      state.user = {
        first_name: '',
        last_name: '',
        city: '',
        state: ''
      }
      state.authenticated = false
      localStorage.removeItem('user')
    },

    init (state) {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        state.authenticated = user.authenticated
        state.user = user.user
      }

      state.initialized = true
    }
  },

  actions: {
    login ({ state, commit, rootState }, { email, password }) {
      if (!state.authenticated) {
        const user = rootState.database.users.find(user => email === user.email)

        if (user && user.password === password) {
          commit('login', user)
          return true
        } else {
          return false
        }
      }
    }
  }
}