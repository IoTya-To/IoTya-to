<template>
  <v-list-item>
    <v-text-field
      v-model="color"
      :rules="[rules.HEXColor]"
      label="color"
      :value="chartdata.borderColor"
      required
    />
    <v-btn :color="color" width="10" height="10" />
  </v-list-item>
</template>

<script>
const regExp = /^#([0-9]|[A-F]|[a-f]){6}$|^#([F0]|[f0]){3}$/
export default {
  name: 'ColorPickOption',
  props: {
    chartdata: Object
  },
  data () {
    return {
      color: this.chartdata.borderColor,
      rules: {
        HEXColor: value => regExp.test(value) || 'not HEX ColorCode'
      }
    }
  }
}
</script>

<style scoped>

</style>
