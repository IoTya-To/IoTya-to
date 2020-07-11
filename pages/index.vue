<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm2 md4 lg4 xl4>
      <v-row>
        <v-col v-for="n in 6" :key="n" :cols="4">
          <v-card>
            <v-row>
              <v-col>
                <v-card-title class="px-2 py-0 mx-3 my-0">
                  {{ n }}
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
                        <v-list-item @click="alert">
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
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  methods: {
    alert () {
      alert('click')
    }
  }
}
</script>
