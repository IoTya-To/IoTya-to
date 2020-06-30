<template>
  <v-container>
    <client-only placeholder="Loading...">
      <Apexcharts
        type="line"
        height="350"
        :options="chartOptions"
        :series="series"
      />
    </client-only>
  </v-container>
</template>
<script>

export default {
  inject: ['theme'],
  components: {
    Apexcharts: () => import('vue-apexcharts')
  },
  data () {
    return {
      series: [{
        name: 'Desktops',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Product Trends by Month',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        tooltip: {
          theme: [
            (this.$vuetify.theme.dark ? 'dark' : 'light')
          ]
        }
      }
    }
  }
}
</script>
