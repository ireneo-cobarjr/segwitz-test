<template>
  <div id="dashboard">
    <div class="navbar">
      <h1>Dashboard</h1>
    </div>
    <div class="card">
      <h3>Hi <span class="capitalize">{{ `${user.first_name} ${user.last_name}!` }}</span></h3>
      <p>
        People from your place at <span class="capitalize bold">{{ `${user.city}, ${user.state}` }}</span> are also here too!
      </p>

      <button class="button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  computed: {
    user () {
      return this.$store.state.user.user
    }
  },
  methods: {
    logout () {
      this.$store.commit('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  #dashboard {
    width: 100%;
    max-width: 1400px;
    margin: auto;

    .navbar {
      padding: .25rem .5rem;
    }

    .card {
      width: 400px;
      margin: 3rem auto;
    }
  }
</style>