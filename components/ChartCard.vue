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
                <v-list-item @click="alert">
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
      <streaming-chart />
      <v-overlay
        absolute
        :value="overlay"
      >
        <v-btn @click="overlay=false">
          close
        </v-btn>
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
      overlay: false
    }
  },
  methods: {
    alert () {
      alert('click')
    }
  }
}
</script>

<style scoped>

</style>
