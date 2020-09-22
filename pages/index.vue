<template>
  <v-layout column justify-center align-center>
    <v-container fluid>
      <v-btn @click="loginOverlay=true">
        show
      </v-btn>
      <v-overlay
        :absolute="true"
        :opacity="0.85"
        :value="loginOverlay"
        :z-index="5"
      >
        <v-layout justify-center>
          <login-form @LoginSuccessful="LoginSuccessful"/>
        </v-layout>
        <v-layout justify-center>
          <v-btn
            color="primary"
            @click="loginOverlay = false"
          >
            Hide Overlay
          </v-btn>
        </v-layout>
      </v-overlay>
      <v-row>
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
        <v-btn>
          test
        </v-btn>
        <v-btn @click="addData('chart1','Dataset 1',0)">
          addData
        </v-btn>
      </v-row>
    </v-container>
  </v-layout>
</template>
<script>
// import Draggable from 'vuedraggable'
import ChartCard from '../components/ChartCard'
import LoginForm from '../components/LoginForm'

// todo fix config file
const io = require('socket.io-client')
export default {
  components: { LoginForm, ChartCard },
  data () {
    return {
      serverAddress: 'https://localhost:8080',
      componentKey: 0,
      baseGridSize: 4,
      loginOverlay: false,
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
  mounted () {
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
    LoginSuccessful () {
      this.loginOverlay = false
    },
    getmd (item) {
      if (item.length < 4) {
        return 12 / item.length
      } else {
        return 3
      }
    },
    refresh () {
      this.componentKey += 1
    },
    addData (receiveData) {
      console.log('methio')
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
      return this.charts.find((chart) => { return chart.id === chartid })
    },
    findData (chart, label) {
      console.log(chart)
      return chart.datasets.find((dataset) => { return dataset.label === label }).data
    }
  }
}
</script>
