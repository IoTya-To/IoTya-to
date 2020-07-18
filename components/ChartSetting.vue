<template>
  <v-list>
    <v-list-item>
      <v-text-field
        :v-model="chartdataset.label"
        label="ChartLabel"
        :value="chartdataset.label"
        max="10"
        min="1"
        required
      />
    </v-list-item>
    <color-pick-option :chartdata="chartdataset"/>
  </v-list>
</template>

<script>
import ColorPickOption from './ColorPickOption'
export default {
  name: 'ChartSetting',
  components: { ColorPickOption },
  props: ['chartdataset']
}
</script>

<style scoped>

</style>
