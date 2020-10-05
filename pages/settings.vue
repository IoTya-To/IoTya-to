<template>
  <v-container>
    <v-row>
      <v-layout justify-center>
        <v-card>
          <v-card-title>Settings Page</v-card-title>
          <v-list>
            <v-list-item>
              <v-list-item-title class="pr-16">
                DarkTheme
              </v-list-item-title>
              <v-list-item-action>
                <v-switch
                  v-model="$vuetify.theme.dark"
                  hide-details
                  inset
                  color="#ffffff"
                />
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                SecretKey
              </v-list-item-title>
              <v-list-item-action>
                <v-text-field label="SecretKey" />
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-layout>
    </v-row>
    <v-row>
      <upload-charts-json-vue />
    </v-row>
  </v-container>
</template>
<script>
import UploadChartsJson from '@/components/uploadCharts-json'
export default {
  components: { UploadChartsJsonVue: UploadChartsJson }
}
</script>
