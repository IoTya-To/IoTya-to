<template>
  <v-layout justify-center>
    <v-card>
      <v-card-title>Settings Page</v-card-title>
      <v-list>
        <v-list-item>
          <v-list-item-title class="pr-16">DarkTheme</v-list-item-title>
          <v-list-item-action>
            <v-switch
              v-model="$vuetify.theme.dark"
              hide-details
              inset
              color="#ffffff"
            />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-layout>
</template>
