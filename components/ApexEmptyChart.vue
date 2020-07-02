<template>
  <Apexcharts
    type="line"
    height="350"
    :options="chartOptions"
    :series="[]"
  />
</template>

<script>
export default {
  name: 'ApexEmptyChart',
  components: {
    Apexcharts: () => import('vue-apexcharts')
  },
  data () {
    return {
      chartOptions: {
        series: [],
        title: {
          text: 'Sample'
        },
        noData: {
          text: 'Waiting for connection'
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
