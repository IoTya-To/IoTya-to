<template>
  <v-list-item>
    <v-text-field
      :label="label"
      required
    />
    <v-btn color="#36a2eb" width="10" height="10" />
  </v-list-item>
</template>

<script>
export default {
  name: 'ColorPickOption',
  props: ['label']
}
</script>

<style scoped>

</style>
