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
              label="e-mail"
              :rules="rules.eMailRules"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              label="password"
              :rules="rules.passwordRules"
              @click:append="show = !show"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              label="password"
              :rules="rules.CheckPassword"
              @click:append="show = !show"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-layout justify-center>
            <v-btn @click="login()">
              Login
            </v-btn>
          </v-layout>
        </v-row>
      </v-col>
    </v-card>
  </v-container>
</template>
<script>
import config from '../components/firebaseConfig'
const firebase = require('firebase/app')
require('firebase/auth')
export default {
  name: 'LoginForm',
  data () {
    return {
      show: false,
      eMail: '',
      password: '',
      rules: {
        eMailRegix: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+$/,
        passwordRegix: /^(?=.*\d)(?=.*[a-z])(?=.+[A-Z]).{8,}$/,
        eMailRules: [input => !!input || 'E-mail is required', input => this.rules.eMailRegix.test(input) || 'it is not the correct email address.'],
        passwordRules: [input => !!input || 'Password is required', input => this.rules.passwordRegix.test(input) || 'this password is so weak'],
        CheckPassword: [input => input === this.password || 'Passwords do not match']
      }
    }
  },
  methods: {
    login () {
      firebase.initializeApp(config)
      firebase.auth().signInWithEmailAndPassword(this.eMail, this.password).then(() => {
        console.log(firebase.auth().currentUser.email)
        this.$emit('LoginSuccessful')
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }
}
</script>

<style scoped>

</style>
