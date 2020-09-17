<template>
  <v-container>
    <v-card :light="!$vuetify.theme.dark">
      <v-card-title>
        Login
      </v-card-title>
      <v-col class="pa-6">
        <v-row>
          <v-col>
            <v-text-field
              v-model="Mail"
              label="e-mail"
              :rules="rules.eMailRules"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="Password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              label="password"
              @click:append="show = !show"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-layout justify-center>
            <v-btn>
              Login
            </v-btn>
          </v-layout>
        </v-row>
      </v-col>
    </v-card>
  </v-container>
</template>
<script>

export default {
  // todo add inpur rule
  name: 'LoginForm',
  data () {
    return {
      show: false,
      Mail: '',
      Password: '',
      rules: {
        eMailRegix: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+$/,
        eMailRules: [input => !!input || 'E-mail is required', input => this.rules.eMailRegix.test(input) || 'it is not the correct email address.']
      }
    }
  }
}
</script>

<style scoped>

</style>
