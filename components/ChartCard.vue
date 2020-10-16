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
      <streaming-chart v-show="!draggable" :key="componentKey" v-model="chartList" :data="chartList.datasets" />
      <v-skeleton-loader
        v-show="draggable_"
        class="ma-auto"
        height="400"
      />
      <v-overlay
        absolute
        z-index="0"
        :value="overlay"
      >
        <v-card :light="!$vuetify.theme.dark">
          <v-col class="px-4">
            <v-list max-height="350px" class="overflow-y-auto">
              <v-list-item>
                <v-text-field
                  label="ChartID"
                  :v-model="chartList.id"
                  :value="chartList.id"
                  required
                  @input="$emit('input', chartList)"
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
              <v-list-item v-for="(_,index) in chartList.datasets" :key="index">
                <chart-setting v-model="chartList.datasets[index]" />
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
import ChartSetting from './ChartSetting'
export default {
  name: 'ChartCard',
  components: { ChartSetting },
  props: {
    value: {
      type: Object,
      required: true,
      default: null
    },
    draggable: {
      type: Boolean,
      required: true,
      defalt: false
    }
  },
  data () {
    return {
      componentKey: 0,
      overlay: false,
      rules: {
        chartNumMAX: value => parseInt(value) < 10 || 'Too much',
        chartNumMIN: value => parseInt(value) > 0 || 'Too little'
      }
    }
  },
  computed: {
    /**
      *@property {String} chartTitle
     */
    chartList: {
      get () {
        return this.value
      }
    },
    draggable_: {
      get () {
        return this.draggable
      }
    }
  },
  methods: {
    log (obg) {
      obg.forEach(function (value) {
        console.log(value)
      })
    },
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
