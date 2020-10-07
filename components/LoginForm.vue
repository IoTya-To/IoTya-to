<template>
  <v-container>
    <v-card :light="!$vuetify.theme.dark" flat>
      <v-card-title>
        Login
      </v-card-title>
      <v-col class="pa-6">
        <v-row>
          <v-col>
            <v-text-field
              v-model="eMail"
              :disabled="loading"
              label="e-mail"
              :rules="rules.eMailRules"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="password"
              :disabled="loading"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              label="password"
              @click:append="show = !show"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-layout justify-center>
            <v-btn
              :loading="loading"
              :disabled="loading"
              @click="login"
            >
              Login
            </v-btn>
          </v-layout>
        </v-row>
      </v-col>
    </v-card>
  </v-container>
</template>
<script>
import firebase from 'firebase/app'
import alertColor from '../src/AlertColor'
require('firebase/auth')
export default {
  name: 'LoginForm',
  data () {
    return {
      show: false,
      eMail: '',
      password: '',
      loading: false,
      rules: {
        eMailRegex: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+$/,
        eMailRules: [input => !!input || 'E-mail is required', input => this.rules.eMailRegex.test(input) || 'it is not the correct email address.']
      }
    }
  },
  methods: {
    login () {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      this.loading = true
      firebase.auth().signInWithEmailAndPassword(this.eMail, this.password).then(() => {
        console.log(firebase.auth().currentUser.email)
        this.loading = false
        this.$emit('LoginSuccessful')
      }).catch((err) => {
        this.loading = false
        this.$emit('onAlert', { message: err.message, color: alertColor.error })
        console.log(err.message)
      })
    }
  }
}
</script>

<style scoped>

</style>
