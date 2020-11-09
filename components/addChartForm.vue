<template>
  <v-dialog v-model="dialog" max-width="800" scrollable>
    <template v-slot:activator="{on}">
      <v-btn v-on="on">
        addChart
      </v-btn>
    </template>
    <v-card max-height="800">
      <v-card-title>
        AddChart
      </v-card-title>
      <v-card-text>
        <v-btn @click="test">
          あ
        </v-btn>
        <v-container>
          <v-col>
            <v-row>
              <v-col>
                <v-form ref="form">
                  <v-col>
                    <v-text-field v-model="Chart.chartTitle" label="ChartTitle" :rules="rules.ChartTitleRule" />
                  </v-col>
                  <v-col>
                    <v-text-field v-model="Chart.id" label="ChartID" :rules="rules.ChartIDRule" />
                  </v-col>
                  <v-col v-for="(_,n) in Chart.datasets" :key="n">
                    <chart-setting v-model="Chart.datasets[n]" />
                  </v-col>
                  <v-col>
                    <v-layout justify-center>
                      <v-btn @click="addChartItem">
                        <v-icon>
                          mdi-plus
                        </v-icon>
                      </v-btn>
                    </v-layout>
                  </v-col>
                  <v-btn @click="add">
                    Add
                  </v-btn>
                </v-form>
              </v-col>
              <v-col cols="6">
                <v-layout align-center justify-center>
                  <sample-chart :key="key" v-model="Chart.datasets" />
                </v-layout>
              </v-col>
            </v-row>
          </v-col>
        </v-container>
      </v-card-text>
      <v-btn @click="refresh" />
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
import alertColor from '../src/AlertColor'
import ChartSetting from '@/components/ChartSetting'
import SampleChart from '@/components/sampleChart'
export default {
  name: 'AddChartForm',
  components: { SampleChart, ChartSetting },
  data () {
    return {
      teeest: 'aaa',
      key: 0,
      date: null,
      dialog: false,
      Chart: {
        chartTitle: '',
        id: '',
        datasets: []
      },
      rules: {
        ChartTitleRule: [input => !!input || 'ChartTitle is required'],
        ChartIDRule: [input => !!input || 'ChartID is required']
      }
    }
  },
  mounted () {
    this.date = moment()
    this.addChartItem()
  },
  methods: {
    test () {
      this.$refs.chat.$emit('test')
    },
    refresh () {
      this.key += 1
    },
    addChartItem () {
      this.key += 1
      this.Chart.datasets.push({
        label: 'label 1',
        fill: false,
        borderColor: '#FF6384',
        backgroundColor: '#FF6384',
        data: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
      })
    },
    add () {
      if (!this.$refs.form.validate()) {
        this.$emit('onAlert', { message: 'Incorrect input.', color: alertColor.error })
        return
      }
      this.$emit('input', this.Chart)
    }
  }
}
</script>

<style scoped>

</style>
