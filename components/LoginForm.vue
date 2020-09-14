<template>
  <v-container>
    <v-card>
      <v-col class="pa-6">
        <v-row>
          <v-col>
            <v-text-field
              v-model=Mail
              label="e-mail"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model=Password
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
  name: 'LoginForm',
  data () {
    return {
      show: false,
      Mail: '',
      Password: ''
    }
  }
}
</script>

<style scoped>

</style>
