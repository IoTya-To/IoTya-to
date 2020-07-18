<template>
  <v-card>
    <v-row>
      <v-col>
        <v-card-title
          class="px-2 py-0 mx-3 my-0"
        >
          {{ chartList.chartTitle }}
        </v-card-title>
      </v-col>
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
      <streaming-chart :key="componentKey" :data="chartList.datasets" />
      <v-btn @click="addData(chartList.datasets)">aaa</v-btn>
      <v-overlay
        absolute
        z-index="0"
        :value="overlay"
      >
        <v-card>
          <v-col class="px-4">
            <v-list max-height="350px" class="overflow-y-auto">
              <v-list-item>
                <v-text-field
                  label="ChartID"
                  :value="chartList.id"
                  required
                />
              </v-list-item>
              <v-list-item>
                <v-text-field
                  v-model="chartList.chartTitle"
                  label="ChartTitle"
                  :value="chartList.chartTitle"
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
              <ColorPickOption v-for="n in 6" :key="n" :label="'chart'+n" />
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
import ColorPickOption from './ColorPickOption'
export default {
  name: 'ChartCard',
  components: { ColorPickOption },
  props: ['chartList'],
  data () {
    return {
      test: 'a',
      componentKey: 0,
      overlay: false,
      rules: {
        chartNumMAX: value => parseInt(value) < 10 || 'Too much',
        chartNumMIN: value => parseInt(value) > 0 || 'Too little'
      }
    }
  },
  methods: {
    addData (data) {
      data.forEach((data) => {
        data.data.push({
          x: Date.now(),
          y: Math.random()
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
