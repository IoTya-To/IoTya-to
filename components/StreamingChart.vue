<script>
import { Line } from 'vue-chartjs'
import '@taeuk-gang/chartjs-plugin-streaming'
export default {
  extends: Line,
  mounted () {
    this.renderChart(
      {
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
          }
        ]
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
