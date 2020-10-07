<template>
  <v-container>
    <v-card :light="!$vuetify.theme.dark" flat>
      <v-card-title>
        Register
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
              :rules="rules.checkPassword"
              @click:append="show = !show"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-layout justify-center>
            <v-btn @click="register()">
              Register
            </v-btn>
          </v-layout>
        </v-row>
      </v-col>
    </v-card>
  </v-container>
</template>
<script>
import alertColor from '@/src/AlertColor'
const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/database')
export default {
  name: 'LoginForm',
  data () {
    return {
      show: false,
      eMail: '',
      password: '',
      rules: {
        mailAddressPattern: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+$/,
        passwordPattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        eMailRules: [input => !!input || 'E-mail is required', input => this.rules.mailAddressPattern.test(input) || 'it is not the correct email address.'],
        passwordRules: [input => !!input || 'Password is required', input => this.rules.passwordPattern.test(input) || 'this password is so weak'],
        checkPassword: [input => input === this.password || 'Passwords do not match']
      }
    }
  },
  methods: {
    test () {
      console.log(this.rules.eMailRules)
    },
    makeUserDir (userID) {
      const database = firebase.database()
      database.ref('/UserData/' + userID).set({ emailVerified: false }, (error) => {
        if (error) {
          console.log(error)
        } else {
          console.log('書き込みできた')
        }
      })
    },
    register () {
      firebase.auth().createUserWithEmailAndPassword(this.eMail, this.password).then(() => {
        const user = firebase.auth().currentUser
        if (user) {
          // user.sendEmailVerification()
          this.makeUserDir(user.uid)
          // todo DBに未認証のフラグを建てる。
        }
      }).catch((error) => {
        this.$emit('onAlert', { message: error.message, color: alertColor.error })
        console.log(`errorcode : ${error.code} , ${error.message}`)
      })
      this.$emit('onAlert', { message: 'register is success', color: alertColor.success })
    }
  }
}
</script>

<style scoped>

</style>
