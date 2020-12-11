export default {
  namespaced: true,

  state: () => ({
    initialized: false,
    users: []
  }),

  mutations: {
    saveUser (state, user) {
      state.users.push(user)
      localStorage.setItem('users', JSON.stringify(state.users))
    },

    init (state) {
      const users = localStorage.getItem('users')
      if(users) {
        state.users = JSON.parse(users)
      }

      state.initialized = true
    }
  }
}