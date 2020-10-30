<script>
import { Line } from 'vue-chartjs'
export default {
  name: 'SampleChart',
  extends: Line,
  props: {
    data: {
      type: Array,
      required: true,
      default: null
    }
  },
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: 'realtime',
              time: {
                unit: 'second',
                unitStepSize: 5
              }
            }
          ]
        }
      }

    }
  },
  computed: {
    dataset: {
      get () {
        return this.data
      },
      set () {}
    }
  },
  mounted () {
    this.renderChart(this.dataset, this.options)
  }
}
</script>

<style scoped>

</style>
