<template>
  <v-list>
    <v-list-item>
      <v-text-field
        v-model="chartdataset.label"
        label="ChartLabel"
        :value="chartdataset.label"
        @input="$emit('input', chartdataset)"
      />
    </v-list-item>
    <v-list-item />
    <color-pick-option v-model="chartdataset" />
  </v-list>
</template>

<script>
import ColorPickOption from './ColorPickOption'
export default {
  name: 'ChartSetting',
  components: { ColorPickOption },
  props: {
    value: {
      type: Object,
      required: true,
      default: null
    }
  },
  computed: {
    chartdataset: {
      get () {
        return this.value
      }
    }
  }
}
</script>

<style scoped>

</style>
