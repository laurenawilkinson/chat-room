<template>
  <main>
    <div class="container">
      <UserPanel :users="users" :activeUser="activeUser" />
      <ChatPanel ref="chatPanel" :messages="messages" @send:message="sendMessage" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import UserPanel from '@/components/UserPanel/UserPanel.vue'
import ChatPanel from '@/components/ChatPanel/ChatPanel.vue'
import { useWebSocket } from '@vueuse/core'

const websocketURL = import.meta.env.PROD
  ? `wss://${window.location.host}`
  : `ws://localhost:${import.meta.env.VITE_WS_PORT}`

const { send } = useWebSocket(websocketURL, {
  heartbeat: {
    message: JSON.stringify({
      type: 'heartbeat',
      data: {
        message: 'ping'
      }
    }),
    interval: 1000 * 30,
  },
  onConnected: () => {
    console.log('WebSocket connection is open...')
  },
  onDisconnected: () => {
    console.error('WebSocket has disconnected')
  },
  onError: (_ws, event) => {
    console.error('WebSocket has errored', event)
  },
  onMessage: (_ws, event: MessageEvent<string>) => {
    const response = JSON.parse(event.data)

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
})

const users = ref<any[]>([])
const messages = ref<any[]>([])
const activeUser = ref({
  id: '',
  username: '',
  status: 'unknown'
})
const chatPanel = ref<typeof ChatPanel>()

const sendData = (json: object) => send(JSON.stringify(json))

// Send message
const sendMessage = (message: string) => {
  sendData({ type: 'message', data: { message } })
}

// Response handlers
const onMessage = async (data: any) => {
  const maxMessages = 30
  if (messages.value.length < maxMessages) {
    messages.value.push(data)
  } else {
    messages.value.shift()
    messages.value.push(data)
  }

  nextTick(() => {
    chatPanel.value?.scrollToNewestMessage()
  })
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
