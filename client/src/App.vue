<template>
  <main>
    <h1>Chat Room</h1>
    <h2>Messages:</h2>
    <ul>
      <li v-for="(item, index) in messages" :key="index">
        <strong>{{ item.user.username }}</strong>
        <p>{{ item.message }}</p>
      </li>
    </ul>
    <form @submit.prevent="sendMessage">
      <label> Send message </label>
      <input v-model="newMessage" />
      <button type="submit">Send</button>
    </form>
    <h2>Users:</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.username }}
      </li>
    </ul>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const ws = new WebSocket(`ws://${import.meta.env.VITE_WS_DOMAIN}:${import.meta.env.VITE_WS_PORT}`)

// Websocket listeners
ws.onopen = () => {
  console.log('WebSocket connection is open...')
}

ws.onmessage = (e: MessageEvent<string>) => {
  const response = JSON.parse(e.data)

  switch (response.type) {
    case 'message':
      return onMessage(response.data)
    case 'users':
      return onUsers(response.data)
    case 'currentUser':
      return onCurrentUser(response.data)
    default:
      return
  }
}

ws.onclose = () => {
  console.error('WebSocket has disconnected')
}

ws.onerror = (error) => console.error(error)

const users = ref<any[]>([])
const messages = ref<any[]>([])
const currentUser = ref({
  id: '',
  username: ''
})

const newMessage = ref('')

const sendData = (json: object) => ws.send(JSON.stringify(json))

// Send message
const sendMessage = () => {
  sendData({ type: 'message', data: { message: newMessage.value } })
  newMessage.value = ''
}

// Response handlers
const onMessage = (data: any) => {
  const maxMessages = 30
  if (messages.value.length < maxMessages) {
    messages.value.push(data)
  } else {
    messages.value.shift()
    messages.value.push(data)
  }
}

const onUsers = (data: any) => {
  users.value = [...data.users]
  console.log(data.users)
}

const onCurrentUser = (data: any) => {
  currentUser.value = { ...data }
}
</script>

<style lang="scss">
@import '@/styles/reset.scss';

body {
  background: #dff7ff;
}
</style>
