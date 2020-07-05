<template>
  <v-container>
    <Apexcharts
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    />
    <v-btn @click="func" />
  </v-container>
</template>

<script>
const value = [{ x: new Date(), y: Math.random() * 100 }]
export default {
  components: {
    Apexcharts: () => import('vue-apexcharts')
  },
  inject: ['theme'],
  data () {
    return {
      series: [{
        name: 'Desktops',
        data: value
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: true
          },
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              enabled: true,
              speed: 500
            }
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
          type: 'numeric',
          range: 60,
          labels: {
            style: {
              colors: ['#00FF00']
            }
          }
        },
        tooltip: {
          theme: [
            (this.$vuetify.theme.dark ? 'dark' : 'light')
          ]
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    func () {
      value.push([
        {
          x: new Date(),
          y: Math.random() * 100
        }
      ]
      )
      this.$refs.chart.updateSeries([{
        data: value
      }])
    }
  }
}
</script>
