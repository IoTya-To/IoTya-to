<script>
import { Line } from 'vue-chartjs'
import '@taeuk-gang/chartjs-plugin-streaming'
export default {
  extends: Line,
  props: {
    data: {
      type: Array,
      required: true,
      default: null
    }
  },
  mounted () {
    this.renderChart(
      {
        datasets: this.data
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: 'realtime',
              time: {
                unit: 'second',
                unitStepSize: 5
              },
              realtime: {
                duration: 20000,
                delay: 1000,
                refresh: 1000,
                onRefresh (chart) {
                  chart.data.datasets.forEach((dataset) => {
                    dataset.data.push({
                      x: Date.now(),
                      y: Math.random()
                    })
                  })
                }
              }
            }
          ]
        }
      }
    )
  }
}
</script>
