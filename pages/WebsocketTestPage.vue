<template>
  <v-container>
    <v-btn>
      btn
    </v-btn>
  </v-container>
</template>

<script>

export default {
  name: 'WebsocketTestPage',
  mounted () {
    const io = require('socket.io-client')
    const socket = io('http://localhost:8080', {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5
    })
    socket.on('connect', () => {
      console.log(`socket.connected: ${socket.connected}`)
      socket.on('ServerMessage', (message) => {
        console.log(message)
      })
    })
  }
}
</script>

<style scoped>

</style>
