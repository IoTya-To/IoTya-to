<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm2 md4 lg4 xl4>
      <v-row>
        <v-col v-for="n in 6" :key="n" :cols="4">
          <v-card>
            <v-card-title>
              {{n}}
            </v-card-title>
            <div>
              <streaming-chart />
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>
<script>
export default {}
</script>
