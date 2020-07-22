<template>
  <v-list>
    <v-list-item>
      <v-text-field
        :v-model="chartdataset_.label"
        label="ChartLabel"
        :value="chartdataset_.label"
        max="10"
        min="1"
        required
      />
    </v-list-item>
    <color-pick-option v-model="chartdataset_" :chartdata="chartdataset" />
  </v-list>
</template>

<script>
import ColorPickOption from './ColorPickOption'
export default {
  name: 'ChartSetting',
  components: { ColorPickOption },
  props: {
    chartdataset: Object
  },
  data () {
    return {
      chartdataset_: this.chartdataset
    }
  }
}
</script>

<style scoped>

</style>
