<template>
  <div id="signup" class="card">
    <h1>Sign-Up</h1>
    <form class="form">
      <!-- first name -->
      <div :class="['form__control', { 'form__control--error': $v.user.first_name.$error }]">
        <label for="first_name">first name</label>
        <input type="text" class="form__input" name="first_name" v-model.trim="$v.user.first_name.$model">
        <span class="form__error" v-if="!$v.user.first_name.required && $v.user.first_name.$error">*This field is required</span>
        <span class="form__error" v-if="(!$v.user.first_name.minLength || !$v.user.first_name.maxLength) && $v.user.first_name.alpha">*Should be 2 - 20 characters</span>
        <span class="form__error" v-if="!$v.user.first_name.alpha">*Only alphabetic characters are allowed</span>
      </div>

      <!-- last name -->
      <div :class="['form__control', { 'form__control--error': $v.user.last_name.$error }]">
        <label for="last_name">last name</label>
        <input type="text" class="form__input" name="last_name" v-model.trim="$v.user.last_name.$model">
        <span class="form__error" v-if="!$v.user.last_name.required && $v.user.last_name.$error">*This field is required</span>
        <span class="form__error" v-if="!$v.user.last_name.minLength || !$v.user.last_name.maxLength">*Should be 2 - 20 characters</span>
      </div>

      <!-- email -->
      <div :class="['form__control', { 'form__control--error': $v.user.email.$error }]">
        <label for="email">email</label>
        <input type="email" class="form__input" name="email" v-model.trim="$v.user.email.$model">
        <span class="form__error" v-if="!$v.user.email.required && $v.user.email.$error">*This field is required</span>
        <span class="form__error" v-if="!$v.user.email.email">*Please provide a valid email</span>
      </div>

      <!-- password -->
      <div :class="['form__control', { 'form__control--error': $v.user.password.$error }]">
        <label for="password">password</label>
        <input type="password" class="form__input" name="password" v-model.trim="$v.user.password.$model">
        <span class="form__error" v-if="!$v.user.password.required && $v.user.password.$error">*This field is required</span>
        <span class="form__error" v-if="(!$v.user.password.minLength || !$v.user.password.maxLength) && $v.user.password.noWhitespace">*Should be 5 - 36 characters</span>
        <span class="form__error" v-if="!$v.user.password.noWhitespace">*White spaces is not allowed</span>
      </div>

      <!-- confirm password -->
      <div :class="['form__control', { 'form__control--error': $v.user.confirm_password.$error }]">
        <label for="confirm_password">confirm password</label>
        <input type="password" class="form__input" name="confirm_password" v-model.trim="$v.user.confirm_password.$model">
        <span class="form__error" v-if="!$v.user.confirm_password.required && $v.user.confirm_password.$error">*This field is required</span>
        <span class="form__error" v-if="!$v.user.confirm_password.sameAs">*Password do not match</span>
      </div>

      <!-- state -->
      <div :class="['form__control', { 'form__control--error': $v.user.state.$error }]">
        <label for="state">State</label>
        <select type="text" class="form__input" name="state" v-model.trim="$v.user.state.$model" @input="checkCity">
          <option v-for="(state, i) in states" :key="i" :value="state.name">{{ state.name }}</option>
        </select>
        <span class="form__error" v-if="!$v.user.state.required && $v.user.state.$error">*This field is required</span>
      </div>

      <!-- city -->
      <div :class="['form__control', { 'form__control--error': $v.user.city.$error }]">
        <label for="city">City</label>
        <select class="form__input" name="city" v-model.trim="$v.user.city.$model">
          <option v-for="(city, i) in cities" :key="i" :value="city">{{ city }}</option>
        </select>
        <span class="form__error" v-if="!$v.user.city.required && $v.user.city.$error">*This field is required</span>
      </div>

      <!-- submit -->
      <button class="button" type="submit" @click.prevent="submit">Sign-Up</button>
      <div class="form__option">
        <router-link :to="{ path: '/login' }">
          I want to Login
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength, alpha, email, sameAs } from 'vuelidate/lib/validators'
const noWhitespace = (value) => value.indexOf(' ') === -1

export default {
  name: 'signup',
  data () {
    return {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        city: '',
        state: ''
      },
      states: [
        {
          name: 'Connecticut',
          cities: ['Bridgeport', 'Danburry', 'Greenwich']
        },
        {
          name: 'Delaware',
          cities: ['Dover', 'Newark', 'Wilmington']
        },
        {
          name: 'Rhode Island',
          cities: ['Cranston', 'Johnston', 'Warwick']
        }
      ]
    }
  },
  computed: {
    cities () {
      return (this.user.state !== '') ? this.states.find(state => state.name === this.user.state).cities : []
    }
  },
  validations: {
    user: {
      first_name: {
        required,
        alpha,
        minLength: minLength(2),
        maxLength: maxLength(20)
      },
      last_name: {
        required,
        alpha,
        minLength: minLength(2),
        maxLength: maxLength(20)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        noWhitespace,
        minLength: minLength(5),
        maxLength: maxLength(36)
      },
      confirm_password: {
        required,
        sameAs: sameAs('password')
      },
      city: {
        required
      },
      state: {
        required
      }
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$store.commit('database/saveUser', this.user)
        this.$router.push({ path: '/login' })
      }
    },
    checkCity (e) {
      if (this.user.city !== '') {
        let index = this.states.find(state => state.name === e.target.value).cities.indexOf(this.user.city)
        if (index === -1) {
          this.user.city = null
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #signup {
    width: 100%;
    max-width: 400px;
    margin: 6rem auto;
  }
</style>
