<template>
  <v-container>
    <Apexcharts
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    />
    <v-btn @click="addValue()">
      push me!
    </v-btn>
  </v-container>
</template>
<script>
const value = []
export default {
  name: 'ApexEmptyChart',
  components: {
    Apexcharts: () => import('vue-apexcharts')
  },
  data () {
    return {
      series: value,
      chartOptions: {
        series: value,
        title: {
          text: 'Sample'
        },
        chart: {
          noData: {
            text: 'Waiting for connection'
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
