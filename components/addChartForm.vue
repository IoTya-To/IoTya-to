<template>
  <v-card>
    <v-card-title>
      AddChart
    </v-card-title>
    <v-form>
      <v-col>
        <v-text-field v-model="Chart.chartTitle" label="ChartTitle" />
      </v-col>
      <v-col>
        <v-text-field v-model="Chart.id" label="ChartID" />
      </v-col>
      <v-col v-for="(_,n) in Chart.datasets" :key="n">
        <chart-setting v-model="Chart.datasets[n]" />
      </v-col>
      <v-col>
        <v-layout justify-center>
          <v-btn @click="addChartItem">
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-layout>
      </v-col>
      <v-btn @click="add">
        Add
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import ChartSetting from '@/components/ChartSetting'
export default {
  name: 'AddChartForm',
  components: { ChartSetting },
  data () {
    return {
      Chart: {
        chartTitle: '',
        id: '',
        datasets: []
      }
    }
  },
  mounted () {
    this.addChartItem()
  },
  methods: {
    addChartItem () {
      this.Chart.datasets.push({
        label: 'label 1',
        fill: false,
        borderColor: '#FF6384',
        backgroundColor: '#FF6384'
      })
    },
    add () {
      this.$emit('input', this.Chart)
    }
  }
}
</script>

<style scoped>

</style>
