<template>
  <v-list-item>
    <v-text-field
      v-model="color"
      :rules="[rules.HEXColor]"
      :label="label"
      required
    />
    <v-btn :color="color" width="10" height="10" />
  </v-list-item>
</template>

<script>
const regExp = /^#([0-9]|[A-F]|[a-f]){6}$|^#([F0]|[f0]){3}$/
export default {
  name: 'ColorPickOption',
  props: ['label'],
  data () {
    return {
      color: '',
      rules: {
        HEXColor: value => regExp.test(value) || 'not HEX ColorCode'
      }
    }
  }
}
</script>

<style scoped>

</style>
