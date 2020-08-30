<template>
  <v-layout>
    <v-container>
      <Draggable tag="v-row">
        <v-col v-for="i in 10" :key="i" cols="4">
          <v-card>
            <v-card-title>
              {{ i }}
            </v-card-title>
          </v-card>
        </v-col>
      </Draggable>
    </v-container>
  </v-layout>
</template>
<script>
import Draggable from 'vuedraggable'
export default {
  components: { Draggable }
}
</script>
