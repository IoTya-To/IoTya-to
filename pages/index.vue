<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm2 md4 lg4 xl4>
      <v-row>
        <v-col v-for="n in 6" :key="n" :cols="4">
          <ChartCard :card-name="n"/>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>
<script>
import ChartCard from '../components/ChartCard'
export default {
  components: { ChartCard }
}
</script>
