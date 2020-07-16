<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <v-row>
        <v-col
          v-for="n in charts"
          :key="n"
          xs="12"
          sm="6"
          :md="getmd(charts)"
          :lg="getmd(charts)"
        >
          <ChartCard :card-name="n.chartTitle" />
        </v-col>
        <v-col cols="12">
          <v-spacer />
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>
<script>
import ChartCard from '../components/ChartCard'
export default {
  components: { ChartCard },
  data () {
    return {
      baseGridSize: 4,
      charts: [
        {
          id: 'temp',
          chartTitle: 'Chart1',
          chartType: 'Line',
          cols: 1,
          unit: '℃',
          color: '#FF0000'
        },
        {
          id: 'clocks',
          chartTitle: 'Chart2',
          chartType: 'Line',
          cols: 1,
          unit: 'Mhz',
          color: '#FFFF00'
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
    }
  }
}
</script>
