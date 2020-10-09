<template>
  <v-container>
    <v-textarea v-model="chartjson" />
    <v-btn @click="upload">
      upload
    </v-btn>
    <v-btn @click="log">
      log
    </v-btn>
  </v-container>
</template>

<script>
const firebase = require('firebase/app')
require('firebase/database')
export default {
  name: 'UploadChartsJsonVue',
  data () {
    return {
      chartjson: ''
    }
  },
  methods: {
    upload () {
      const database = firebase.database()
      const userID = firebase.auth().currentUser.uid
      database.ref('/UserData/' + userID).set({ charts: JSON.parse(this.chartjson) }, (error) => {
        if (error) {
          console.log(error)
        } else {
          console.log('書き込みできた')
        }
      })
    },
    log () {
      console.log(JSON.stringify(this.charts))
    }
  }
}
</script>

<style scoped>

</style>
