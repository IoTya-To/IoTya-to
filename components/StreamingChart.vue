<script>
import { Line } from 'vue-chartjs'
import 'chartjs-plugin-streaming'

export default {
  extends: Line,
  mounted () {
    this.renderChart(
      {
        datasets: [
          {
            label: 'Dataset 1',
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
          },
          {
            label: 'Dataset 2',
            fill: false,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)'
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
                unit: 'second'
              },
              realtime: {
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
