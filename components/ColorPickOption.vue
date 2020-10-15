<template>
  <v-list-item>
    <v-text-field
      v-model="chartdata.borderColor"
      :rules="[rules.HEXColor]"
      label="LineColor"
      :value="chartdata.borderColor"
      @input="$emit('input', chartdata)"
    />
    <v-btn :color="chartdata.borderColor" width="10" height="10" />
    <v-text-field
      v-model="chartdata.backgroundColor"
      :rules="[rules.HEXColor]"
      label="DotColor"
      :value="chartdata.backgroundColor"
      @input="$emit('input', chartdata)"
    />
    <v-btn :color="chartdata.backgroundColor" width="10" height="10" />
  </v-list-item>
</template>

<script>
const colorRegex = /^#([0-9]|[A-F]|[a-f]){6}$|^#([F0]|[f0]){3}$/
export default {
  name: 'ColorPickOption',
  props: {
    value: {
      type: Object,
      required: true,
      default: null
    }
  },
  data () {
    return {
      rules: {
        HEXColor: value => colorRegex.test(value) || 'not HEX ColorCode'
      }
    }
  },
  computed: {
    chartdata: {
      get () {
        return this.value
      }
    }
  }
}
</script>

<style scoped>

</style>
