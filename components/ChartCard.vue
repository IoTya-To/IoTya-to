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
          <v-row>
            <v-col>
              <v-card-text>
                chartID
              </v-card-text>
            </v-col>
            <v-col>
              <v-text-field :counter="10" class="pa-2 ma-0" value="Placeholder" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-text>
                chartName
              </v-card-text>
            </v-col>
            <v-col>
              <v-text-field :counter="10" class="pa-2 ma-0" :value="cardName"/>
            </v-col>
          </v-row>
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
      overlay: false
    }
  }
}
</script>

<style scoped>

</style>
