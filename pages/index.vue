<template>
  <v-layout column justify-center align-center>
    <v-container fluid>
      <v-snackbar v-model="alert" :color="alertColor">
        {{ alertText }}
      </v-snackbar>
      <v-spacer />
      <v-row>
        <v-spacer />
        <v-btn @click="loginOverlay=true">
          Login/Register
        </v-btn>
        <v-btn @click="logout">
          logout
        </v-btn>
        <v-switch v-model="editMode" @change="cardKey++">
          test
        </v-switch>
        <v-btn @click="refresh">
          re
        </v-btn>
        <v-btn @click="uploadCharts">
          save
        </v-btn>
        <v-btn @click="cardKey+=1">
          key
        </v-btn>
      </v-row>
      <v-overlay
        :absolute="true"
        :opacity="0.85"
        :value="loginOverlay"
        :z-index="5"
      >
        <v-card>
          <v-tabs v-model="tab" fixed-tabs :light="!$vuetify.theme.dark">
            <v-tab>
              Login
            </v-tab>
            <v-tab>
              Register
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <login-form @LoginSuccessful="LoginSuccessful" @onAlert="showAlert" />
            </v-tab-item>
            <v-tab-item>
              <RegisterForm @onAlert="showAlert" />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
        <v-layout justify-center>
          <v-btn
            color="primary"
            @click="loginOverlay = false"
          >
            Close
          </v-btn>
        </v-layout>
      </v-overlay>
      <Draggable v-model="charts" class="row" :disabled="!editMode" :animation="200">
        <v-col
          v-for="(_,n) in charts"
          :key="n"
          xs="12"
          sm="6"
          :md="getmd(charts)"
          :lg="getmd(charts)"
        >
          <ChartCard :key="cardKey" v-model="charts[n]" :draggable="editMode" @delete="deleteData" />
        </v-col>
        <v-col
          xs="12"
          sm="6"
          :md="getmd(charts)"
          :lg="getmd(charts)"
        >
          <add-chart-form :key="addcard" @input="addChart" @onAlert="showAlert" />
        </v-col>
      </Draggable>
    </v-container>
  </v-layout>
</template>
<script>
import Draggable from 'vuedraggable'
import firebase from 'firebase/app'
import io from 'socket.io-client'

import ChartCard from '../components/ChartCard'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

import config from '../src/firebaseConfig'
import alertColor from '../src/AlertColor'
import FireBaseUtil from '../src/FireBaseUtil'
import { Dataset } from '../src/Dataset'
import { ChartOptions } from '../src/ChartOptions'
import addChartForm from '@/components/addChartForm'

const fUtil = new FireBaseUtil(firebase)

require('firebase/database')

export default {
  components: {
    LoginForm,
    ChartCard,
    RegisterForm,
    Draggable,
    addChartForm
  },
  data () {
    return {
      socket: {},
      cardKey: 0,
      user: null,
      serverAddress: 'https://localhost:8080',
      baseGridSize: 4,
      alert: false,
      alertText: '',
      alertColor: alertColor.success,
      loginOverlay: false,
      tab: null,
      charts: [],
      editMode: false,
      addcard: 0,
      cardKey: 0
    }
  },
  created () {
  },
  mounted () {
    this.firebaseInitialize()
    this.socket = io('http://localhost:8080', {
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5
    })

    this.socket.on('connect', () => {
      console.log(`socketId:${this.socket.id}`)
      console.log(`socket.connected: ${this.socket.connected}`)
      this.socket.on('ServerMessage', (message) => {
        console.log(message)
        this.addData(message)
      })
    })
  },
  destroyed () {
    this.socket.disconnect()
    console.log('destloyed')
  },
  methods: {
    async firebaseInitialize () {
      // if first, initializeFirebaseApp
      if (firebase.apps.length === 0) {
        firebase.initializeApp(config)
      }
      const user = await fUtil.getLoggedinUser()
      if (user == null) {
        // not Logged in
        this.loginOverlay = true
        return
      } else {
        // logged in
        this.$store.commit('User/set', user.uid)
        this.user = user
      }
      const userData = await fUtil.getUserData('/UserData/' + this.user.uid)
      const settings = userData.settings
      this.$vuetify.theme.dark = settings.darkTheme
      this.charts = userData.charts
    },
    logout () {
      firebase.auth().signOut()
      this.refresh()
    },
    LoginSuccessful () {
      this.showAlert({
        message: 'LoginSuccessful',
        color: alertColor.success
      })
      this.loginOverlay = false
      this.refresh()
    },
    getmd (item) {
      if (item.length < 4) {
        return 12 / item.length
      } else {
        return 3
      }
    },
    showAlert (args) {
      this.alertText = args.message
      this.alertColor = args.color
      this.alert = true
    },
    refresh () {
      this.$nuxt.$emit('refresh')
    },
    addData (receiveData) {
      receiveData.data.forEach((data) => {
        const chart = this.findChart(data.id)
        data.datasets.forEach((dataset) => {
          console.log(dataset)
          const data = this.findData(chart, dataset.label)
          data.push({
            x: Date.now(), // dataset.time,
            y: dataset.value
          })
        })
      })
    },
    deleteData (value) {
      console.log(this.charts)
      this.charts = this.charts.filter(v => v !== value)
    },
    addChart (Chart) {
      this.addcard++
      const data = {
        chartTitle: Chart.chartTitle,
        id: Chart.id,
        datasets: Chart.datasets
      }
      console.log(Chart)
      this.charts.push({
        id: data.id,
        chartTitle: data.chartTitle,
        datasets: data.datasets
      })
    },
    uploadCharts () {
      const uploadData = []
      for (const chart of this.charts) {
        const uploadDatasets = []
        for (const dataset of chart.datasets) {
          uploadDatasets.push(new Dataset(dataset.backgroundColor, dataset.borderColor, dataset.fill, dataset.label))
        }
        uploadData.push(new ChartOptions(chart.chartTitle, uploadDatasets, chart.id))
      }
      console.log(uploadData) // console.log(this.charts)
      fUtil.setUserData('/UserData/' + this.user.uid + '/charts/', uploadData)
    },
    findChart (chartid) {
      return this.charts.find(chart => chart.id === chartid)
    },
    findData (chart, label) {
      console.log(chart)
      return chart.datasets.find(dataset => dataset.label === label).data
    }
  }
}
</script>
