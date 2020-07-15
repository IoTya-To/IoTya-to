<template>
  <v-card>
    <v-row>
      <v-col>
        <v-card-title class="px-2 py-0 mx-3 my-0">
          {{ cardName }}
        </v-card-title>
      </v-col>
      <v-spacer />
      <v-layout align-center>
        <v-col class="px-2 py-0 mx-3 my-0">
          <v-layout justify-end align-center>
            <v-menu offset-y>
              <template v-slot:activator="{on}">
                <v-btn class="px-2 py-0 mx-1 my-0" text icon v-on="on">
                  <v-icon>
                    mdi-dots-vertical
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="componentKey += 1">
                  <v-list-item-action-text>
                    <v-icon>
                      mdi-reload
                    </v-icon>
                    reload
                  </v-list-item-action-text>
                </v-list-item>
                <v-list-item @click="overlay=true">
                  <v-list-item-action-text>
                    <v-icon>
                      mdi-cog
                    </v-icon>
                    Setting
                  </v-list-item-action-text>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-layout>
        </v-col>
      </v-layout>
    </v-row>
    <div>
      <streaming-chart :key="componentKey" />
      <v-overlay
        absolute
        :value="overlay"
      >
        <v-card>
          <v-col class="px-16">
            <v-list>
              <v-list-item>
                <v-text-field
                  label="ChartID"
                  required
                />
              </v-list-item>
              <v-list-item>
                <v-text-field
                  label="ChartTitle"
                  max="10"
                  min="1"
                  required
                />
              </v-list-item>
              <v-list-item>
                <v-text-field
                  label="Number of charts"
                  type="number"
                  required
                  :rules="[rules.chartNumMAX,rules.chartNumMIN]"
                />
              </v-list-item>
              <v-list-item>
                <v-text-field
                  label="Color"
                  required
                />
                <v-btn color="#36a2eb" width="10" height="10" />
              </v-list-item>
            </v-list>
          </v-col>
          <v-layout justify-center>
            <v-btn class="ma-4" @click="overlay=false">
              close
            </v-btn>
          </v-layout>
        </v-card>
      </v-overlay>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'ChartCard',
  props: ['cardName'],
  data () {
    return {
      componentKey: 0,
      overlay: false,
      rules: {
        chartNumMAX: value => parseInt(value) < 10 || 'Too much',
        chartNumMIN: value => parseInt(value) > 0 || 'Too little'
      }
    }
  }
}
</script>

<style scoped>

</style>
