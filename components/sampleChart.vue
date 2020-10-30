<script>
import { Line } from 'vue-chartjs'
import moment from 'moment'
export default {
  name: 'SampleChart',
  extends: Line,
  props: {
    value: {
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
    labels: {
      get () {
        const ment = moment()
        const labels = []
        for (let i = 0; i < 5; i++) {
          labels.push(ment.add(i, 's').format('h:mm:ss a'))
        }
        return labels
      }
    }
  },
  mounted () {
    this.renderChart({ labels: this.labels, datasets: this.value }, this.options)
  },
  methods: {
    test () {
      console.log('ada')
    }
  }
}
</script>

<style scoped>

</style>
