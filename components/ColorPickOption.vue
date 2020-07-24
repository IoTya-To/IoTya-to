<template>
  <v-list-item>
    <v-text-field
      v-model="chartdata_.borderColor"
      :rules="[rules.HEXColor]"
      label="LineColor"
      :value="chartdata_.borderColor"
      @input="$emit('input', chartdata_)"
    />
    <v-btn :color="chartdata_.borderColor" width="10" height="10" />
    <v-text-field
      v-model="chartdata_.backgroundColor"
      :rules="[rules.HEXColor]"
      label="DotColor"
      :value="chartdata_.backgroundColor"
      @input="$emit('input', chartdata_)"
    />
    <v-btn :color="chartdata_.backgroundColor" width="10" height="10" />
  </v-list-item>
</template>

<script>
const regExp = /^#([0-9]|[A-F]|[a-f]){6}$|^#([F0]|[f0]){3}$/
export default {
  name: 'ColorPickOption',
  props: {
    chartdata: {
      type: Object,
      required: true,
      default: null
    }
  },
  data () {
    return {
      chartdata_: this.chartdata,
      rules: {
        HEXColor: value => regExp.test(value) || 'not HEX ColorCode'
      }
    }
  }
}
</script>

<style scoped>

</style>
