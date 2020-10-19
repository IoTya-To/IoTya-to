<template>
  <v-layout>
    <v-container>
      <v-switch v-model="dragable" />
      <Draggable class="row" :options="{disabled: !dragable}">
        <v-col v-for="i in 2" :key="i" cols="3" class="ma-0">
          <v-card>
            <v-card-title>
              {{ i }}
            </v-card-title>
            <streaming-chart v-show="!dragable" :data="chart.datasets" />
            <v-skeleton-loader
              v-show="dragable"
              class="ma-auto"
              height="400"
            />
          </v-card>
        </v-col>
      </Draggable>
      <v-col>
        <add-chart-form />
      </v-col>
    </v-container>
  </v-layout>
</template>
<script>
import Draggable from 'vuedraggable'
import StreamingChart from '@/components/StreamingChart'
import addChartForm from '@/components/addChartForm'
export default {
  components: { StreamingChart, Draggable, addChartForm },
  data () {
    return {
      dragable: true,
      chart: {
        datasets: [
          {
            label: 'Dataset 1',
            fill: false,
            borderColor: '#FFFF84',
            backgroundColor: '#FFFF84'
          },
          {
            label: 'Dataset 2',
            fill: false,
            borderColor: '#AADDFF',
            backgroundColor: '#AADD FF'
          }
        ]
      }
    }
  }
}
</script>
