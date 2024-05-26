<template>
  <main>
    <div class="container">
      <UserPanel :users="users" :activeUser="activeUser" />
      <ChatPanel :messages="messages" @send:message="sendMessage" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import UserPanel from '@/components/UserPanel/UserPanel.vue'
import ChatPanel from '@/components/ChatPanel.vue'

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
    case 'activeUser':
      return onActiveUser(response.data)
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
const activeUser = ref({
  id: '',
  username: ''
})

const sendData = (json: object) => ws.send(JSON.stringify(json))

// Send message
const sendMessage = (message: string) => {
  sendData({ type: 'message', data: { message } })
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
}

const onActiveUser = (data: any) => {
  activeUser.value = { ...data }
}
</script>

<style lang="scss">
@import '@/styles/reset.scss';
@import '@/styles/variables.scss';
@import '@/styles/global.scss';
</style>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2rem;
}

.container {
  display: grid;
  grid-template-columns: 345px 1fr;
  gap: 50px;
  width: 100%;
  max-width: 1350px;
  height: 80vh;
  min-height: 600px;
}
</style>
