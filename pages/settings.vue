<template>
  <v-container>
    <v-card>
      <v-card-title>Settings Page</v-card-title>
      <v-col>
        <v-card outlined>
          <v-row>
            <v-col>
              <v-card-title>DarkTheme</v-card-title>
            </v-col>
            <v-col>
              <v-layout justify-end>
                <v-switch
                  v-model="$vuetify.theme.dark"
                  hide-details
                  inset
                  color="#ffffff"
                />
              </v-layout>
            </v-col>
          </v-row>
        </v-card>
        <v-card outlined>
          <v-row>
            <v-col>
              <v-card-title>DarkTheme</v-card-title>
            </v-col>
            <v-col>
              <v-layout justify-end>
                <v-switch
                  v-model="$vuetify.theme.dark"
                  hide-details
                  inset
                  color="#ffffff"
                />
              </v-layout>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-card>
  </v-container>
</template>
