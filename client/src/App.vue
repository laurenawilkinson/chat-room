<template>
  <main>
    <header>
      <h1>Chat Room</h1>
      <IconButton @click="showUsersPanel = true">
        <IconMenu />
      </IconButton>
    </header>
    <div class="container">
      <template v-if="isDesktop">
        <UserPanel :users="users" :activeUser="activeUser" />
      </template>
      <template v-else>
        <Transition name="slide-left" mode="out-in">
          <UserPanel v-if="showUsersPanel" :users="users" :activeUser="activeUser" @close="showUsersPanel = false" />
        </Transition>
      </template>
      <ChatPanel ref="chatPanel" :messages="messages" @send:message="sendMessage" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import UserPanel from '@/components/UserPanel/UserPanel.vue'
import ChatPanel from '@/components/ChatPanel/ChatPanel.vue'
import { IconMenu } from '@tabler/icons-vue'
import IconButton from './components/UI/IconButton.vue'
import { useBreakpoints, useWebSocket } from '@vueuse/core'
import { breakpointsConfig } from './helpers/utils'

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
const showUsersPanel = ref(false);
const breakpoints = useBreakpoints(breakpointsConfig)
const isDesktop = breakpoints.greater('lg')
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
@import '@/styles/mixins/breakpoints';

main {
  display: flex;
  flex-direction: column;
  height: 100vh;

  @include min-breakpoint($mobile-bp) {
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 2rem;
  }
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-bottom: 2px solid var(--background-colour);

  @include min-breakpoint($mobile-bp) {
    display: none;
  }

  h1 {
    color: var(--primary-colour);
    font-size: var(--20px);
  }
}

.container {
  display: grid;
  width: 100%;
  height: 100%;
  max-width: 1350px;

  @include min-breakpoint($mobile-bp) {
    grid-template-columns: 345px 1fr;
    gap: 50px;
    min-height: 600px;
    height: 80vh;
  }
}
</style>
