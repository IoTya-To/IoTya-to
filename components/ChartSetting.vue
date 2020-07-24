<template>
  <v-list>
    <v-list-item>
      <v-text-field
        v-model="chartdataset_.label"
        label="ChartLabel"
        :value="chartdataset_.label"
        @input="$emit('input', chartdataset_)"
      />
    </v-list-item>
    <v-list-item>
    </v-list-item>
    <color-pick-option v-model="chartdataset_" :chartdata="chartdataset_" />
  </v-list>
</template>

<script>
import ColorPickOption from './ColorPickOption'
export default {
  name: 'ChartSetting',
  components: { ColorPickOption },
  props: {
    chartdataset: {
      type: Object,
      required: true,
      default: null
    }
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
