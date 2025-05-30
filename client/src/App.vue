<template>
  <main>
    <header>
      <IconButton theme="primary" @click="showInfoModal = true">
        <IconInfoCircle />
      </IconButton>
      <IconButton @click="showUsersPanel = true">
        <IconMenu />
      </IconButton>
    </header>
    <div class="container">
      <template v-if="isDesktop">
        <UserPanel :users="users" :activeUser="activeUser" @open:settings="showUserSettings = true" />
      </template>
      <template v-else>
        <Transition name="slide-left" mode="out-in">
          <UserPanel v-if="showUsersPanel" :users="users" :activeUser="activeUser"
            @open:settings="showUserSettings = true" @close="showUsersPanel = false" />
        </Transition>
      </template>
      <ChatPanel ref="chatPanel" :messages="messages" @send:message="sendMessage" />
    </div>
  </main>
  <SiteInfoModal :show="showInfoModal" @close="showInfoModal = false" />
  <UserSettingsModal :show="showUserSettings" :user="activeUser" @submit="sendUserProfileData"
    @close="showUserSettings = false" />
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import UserPanel from '@/components/UserPanel/UserPanel.vue'
import ChatPanel from '@/components/ChatPanel/ChatPanel.vue'
import { IconInfoCircle, IconMenu } from '@tabler/icons-vue'
import IconButton from './components/UI/IconButton.vue'
import SiteInfoModal from './components/Modals/SiteInfoModal.vue'
import UserSettingsModal from './components/Modals/UserSettingsModal.vue'
import { useBreakpoints, useWebSocket } from '@vueuse/core'
import { breakpointsConfig } from './helpers/utils'
import type { EditableUserProfile } from '~/types/user'
import type { ActiveUserResponse, MessageListResponse, MessageResponse, Response, UsersResponse } from '~/types/responses'
import User from './models/User'
import Message from './models/Message'
import { maxMessageCount } from '~/helpers/message'
import { defaultUserProfile } from './helpers/user'

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
    onUserDisconnect()
  },
  onError: (_ws, event) => {
    console.error('WebSocket has errored', event)
    onUserDisconnect()
  },
  onMessage: (_ws, event: MessageEvent<string>) => {
    const response = JSON.parse(event.data) as Response;

    switch (response.type) {
      case 'message':
        return onMessage(response.data)
      case 'messages':
        return onMessages(response.data)
      case 'users':
        return onUsers(response.data)
      case 'activeUser':
        return onActiveUser(response.data)
      default:
        return
    }
  }
})

const users = ref<User[]>([])
const messages = ref<Message[]>([])
const activeUser = ref<User>(new User(defaultUserProfile))
const showUsersPanel = ref(false);
const showUserSettings = ref(false)
const showInfoModal = ref(false);
const breakpoints = useBreakpoints(breakpointsConfig)
const isDesktop = breakpoints.greater('lg')
const chatPanel = ref<typeof ChatPanel>()

const sendData = (json: object) => send(JSON.stringify(json))

// Send message
const sendMessage = (message: string) => {
  sendData({ type: 'message', data: { message } })
}

const sendUserProfileData = (data: EditableUserProfile) => {
  sendData({ type: 'profile', data })
  showUserSettings.value = false
}

// Response handlers
const onMessage = async (data: MessageResponse['data']) => {
  const message = new Message(data)
  if (messages.value.length < maxMessageCount) {
    messages.value.push(message)
  } else {
    messages.value.shift()
    messages.value.push(message)
  }

  nextTick(() => {
    chatPanel.value?.scrollToNewestMessage()
  })
}

const onMessages = (data: MessageListResponse['data']) => {
  messages.value = data.map(message => new Message(message));
}

const onUsers = (data: UsersResponse['data']) => {
  users.value = [...data.map(user => new User(user))]
}

const onActiveUser = (data: ActiveUserResponse['data']) => {
  activeUser.value = new User(data)
}

const onUserDisconnect = () => {
  activeUser.value.status = 'unknown'
  users.value.forEach(user => {
    if (user.id === activeUser.value.id) user.status = 'unknown'
  })
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
  justify-content: flex-end;
  align-items: center;
  gap: .5rem;
  padding: 1rem;
  background-color: white;
  width: 100%;
  border-bottom: 1px solid #eee;

  @include min-breakpoint($mobile-bp) {
    position: fixed;
    top: 0;
    left: 0;
    background-color: transparent;
    border: 0;

    button:last-of-type {
      display: none;
    }
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
