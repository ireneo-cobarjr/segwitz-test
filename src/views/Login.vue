<template>
  <div id="login" class="card">
    <h1>Login</h1>
    <form class="form">
      <!-- email -->
      <div :class="['form__control', { 'form__control--error': $v.user.email.$error }]">
        <label for="email">email</label>
        <input type="email" class="form__input" name="email" v-model.trim="$v.user.email.$model">
        <span class="form__error" v-if="!$v.user.email.required && $v.user.email.$error">*This field is required</span>
        <span class="form__error" v-if="!$v.user.email.email">*Please provide a valid email</span>
        <span class="form__error" v-if="!$v.user.email.auth && user.email !== ''">*Invalid email and/or password</span>
      </div>

      <!-- password -->
      <div :class="['form__control', { 'form__control--error': $v.user.password.$error }]">
        <label for="password">password</label>
        <input type="password" class="form__input" name="password" v-model.trim="$v.user.password.$model">
        <span class="form__error" v-if="!$v.user.password.required && $v.user.password.$error">*This field is required</span>
        <span class="form__error" v-if="(!$v.user.password.minLength || !$v.user.password.maxLength)">*Should be 5 - 36 characters</span>
        <span class="form__error" v-if="!$v.user.password.auth && user.password !== '' && $v.user.password.maxLength && $v.user.password.minLength ">*Invalid email and/or password</span>
      </div>

      <!-- submit -->
      <button class="button" type="submit" @click.prevent="submit">Login</button>
      <div class="form__option">
        <router-link :to="{ path: '/signup' }">
          I want to Sign-up
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      auth: true
    }
  },
  validations: {
    user: {
      email: {
        required,
        email,
        auth: function () { return this.auth }
      },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(36),
        auth: function () { return this.auth }
      }
    }
  },
  methods: {
    async submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.auth = await this.$store.dispatch('user/login', this.user)
        if (this.auth) {
          this.$router.push({ path: '/' })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #login {
    width: 100%;
    max-width: 400px;
    margin: 6rem auto;
  }
</style>
