<template>
  <v-layout column justify-center align-center>
    <v-container fluid>
      <Draggable v-model="charts" tag="v-row" ：sort=" true " @change="refresh" >
        <v-col
          v-for="(chart,n) in charts"
          :key="n"
          xs="12"
          sm="6"
          :md="getmd(charts)"
          :lg="getmd(charts)"
        >
          <ChartCard :key="componentKey" v-model="charts[n]" :chart-list="charts[n]" />
        </v-col>
      </Draggable>
      <v-row>
        <v-btn @click="sout">
          log
        </v-btn>
        <v-btn @click="refresh">
          re
        </v-btn>
      </v-row>
    </v-container>
  </v-layout>
</template>
<script>
import Draggable from 'vuedraggable'
import ChartCard from '../components/ChartCard'
export default {
  components: { ChartCard, Draggable },
  data () {
    return {
      componentKey: 0,
      baseGridSize: 4,
      charts: [
        {
          id: 'temp',
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
        }
      ]
    }
  },
  methods: {
    getmd (item) {
      if (item.length < 4) {
        return 12 / item.length
      } else {
        return 3
      }
    },
    sout () {
      console.log(this.charts)
    },
    refresh () {
      this.componentKey += 1
    }
  }
}
</script>
