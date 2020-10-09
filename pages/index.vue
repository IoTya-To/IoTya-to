<template>
  <v-layout column justify-center align-center>
    <v-container fluid>
      <v-snackbar v-model="alert" :color="alertColor">
        {{ alertText }}
      </v-snackbar>
      <v-btn @click="loginOverlay=true">
        Login/Register {{ user ? user.email : 'null' }}
      </v-btn>
      <v-btn @click="logout">
        logout
      </v-btn>
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
            Hide Overlay
          </v-btn>
        </v-layout>
      </v-overlay>
      <v-row :key="componentKey">
        <v-col
          v-for="(chart,n) in charts"
          :key="n"
          xs="12"
          sm="6"
          :md="getmd(charts)"
          :lg="getmd(charts)"
        >
          <ChartCard v-model="charts[n]" :chart-list="charts[n]" />
        </v-col>
      </v-row>
      <v-row>
        <v-btn @click="refresh">
          re
        </v-btn>
      </v-row>
    </v-container>
  </v-layout>
</template>
<script>
// import Draggable from 'vuedraggable'
import firebase from 'firebase/app'
import io from 'socket.io-client'

import ChartCard from '../components/ChartCard'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import config from '../src/firebaseConfig'
import alertColor from '../src/AlertColor'
require('firebase/database')
const database = firebase.database
export default {
  components: { LoginForm, ChartCard, RegisterForm },
  data () {
    return {
      user: null,
      serverAddress: 'https://localhost:8080',
      componentKey: 0,
      baseGridSize: 4,
      alert: false,
      alertText: '',
      alertColor: alertColor.success,
      loginOverlay: false,
      tab: null,
      charts: [
        {
          id: 'chart1',
          chartTitle: 'ChartHoge',
          datasets: [
            {
              label: 'Dataset 1',
              fill: false,
              borderColor: '#FF6384',
              backgroundColor: '#FF6384'
            },
            {
              label: 'Dataset 2',
              fill: false,
              borderColor: '#36A2EB',
              backgroundColor: '#36A2EB'
            },
            {
              label: 'Dataset 3',
              fill: false,
              borderColor: '#FFAA55',
              backgroundColor: '#FFAA55'
            }
          ]
        },
        {
          id: 'temp',
          chartTitle: 'Chart2',
          datasets: [
            {
              label: 'Dataset 1',
              fill: false,
              borderColor: '#00FF84',
              backgroundColor: '#00FF84'
            },
            {
              label: 'Dataset 2',
              fill: false,
              borderColor: '#AA05FF',
              backgroundColor: '#AA05FF'
            }
          ]
        },
        {
          id: 'temp',
          chartTitle: 'Chart3',
          datasets: [
            {
              label: 'Dataset 1',
              fill: false,
              borderColor: '#FFFF84',
              backgroundColor: '#FFFF84'
            },
            {
              label: 'Dataset 2',
              fill: false,
              borderColor: '#AADDFF',
              backgroundColor: '#AADD FF'
            }
          ]
        }
      ]
    }
  },
  created () {
  },
  mounted () {
    this.firebaseInitialize()
    const socket = io('http://localhost:8080', {
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5
    })

    socket.on('connect', () => {
      console.log(`socket.connected: ${socket.connected}`)
      socket.on('ServerMessage', (message) => {
        console.log(message)
        this.addData(message)
      })
    })
  },
  methods: {
    firebaseInitialize () {
      // if first, initializeFirebaseApp
      if (firebase.apps.length === 0) {
        firebase.initializeApp(config)
      }
      this.getLoginStatus().then((status) => {
        if (status === false) {
          this.loginOverlay = true
        }
        this.charts = this.getUserData()
        console.log(this.charts)
      })
    },
    async getLoginStatus () {
      let status = false
      await new Promise(resolve =>
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.user = user
            status = true
            resolve()
          } else {
            // notLoggedin
            status = false
            resolve()
          }
        }))
      return status
    },
    getUserData () {
      database().ref('/UserData/' + this.user.uid + '/charts').on('value', (data) => {
        return data
      })
    },
    logout () {
      firebase.auth().signOut()
    },
    LoginSuccessful () {
      this.showAlert({ message: 'LoginSuccessful', color: alertColor.success })
      this.loginOverlay = false
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
      this.componentKey += 1
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
