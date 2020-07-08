<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm2 md4 lg4 xl4>
      <v-row>
        <v-col v-for="n in 10" :key="n">
          <v-card>
            <v-row>
              <v-col>
                <div>
                  <streaming-chart />
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>
<script>
export default {}
</script>
