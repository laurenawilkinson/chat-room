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
        <UserPanel :users="users" :activeUser="activeUser" @open:settings="showUserSettings = true"
          @send:status="sendUserStatus" />
      </template>
      <template v-else>
        <Transition name="slide-left" mode="out-in">
          <UserPanel v-if="showUsersPanel" :users="users" :activeUser="activeUser"
            @open:settings="showUserSettings = true" @send:status="sendUserStatus" @close="showUsersPanel = false" />
        </Transition>
      </template>
      <ChatPanel ref="chatPanel" :messages="messages" :isLoading="isLoading.messages" :typingUsers="typingUsers"
        @send:message="sendMessage" @send:typing="sendTypingIndicator" @send:stopTyping="sendStopTypingIndicator" />
    </div>
  </main>
  <SiteInfoModal :show="showInfoModal" @close="showInfoModal = false" />
  <UserSettingsModal :show="showUserSettings" :user="activeUser" @submit="sendUserProfileData"
    @close="showUserSettings = false" />
</template>

<script lang="ts" setup>
import { ref, nextTick, reactive, computed } from 'vue'
import UserPanel from '@/components/UserPanel/UserPanel.vue'
import ChatPanel from '@/components/ChatPanel/ChatPanel.vue'
import { IconInfoCircle, IconMenu } from '@tabler/icons-vue'
import IconButton from './components/UI/IconButton.vue'
import SiteInfoModal from './components/Modals/SiteInfoModal.vue'
import UserSettingsModal from './components/Modals/UserSettingsModal.vue'
import { useBreakpoints, useWebSocket } from '@vueuse/core'
import { breakpointsConfig } from './helpers/utils'
import type { EditableUserProfile, UserStatus } from '~/types/user'
import type { Request } from '~/types/requests'
import type { ActiveUserResponse, MessageListResponse, MessageResponse, Response, TypingUsersResponse, UsersResponse } from '~/types/responses'
import User from './models/User'
import Message from './models/Message'
import { maxMessageCount, typingIndicatorTimeout } from '~/helpers/message'
import { defaultUserProfile, getLocalUser, storeLocalUser } from './helpers/user'
import { debounce, throttle } from 'lodash'

const websocketURL = import.meta.env.PROD
  ? `wss://${window.location.host}`
  : `ws://localhost:${import.meta.env.VITE_SERVER_PORT}`
const localUser = getLocalUser()

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
    console.log('WebSocket connection is open')
    if (localUser) sendUserProfileData(localUser)
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
      case 'typingUsers':
        return onTypingUsers(response.data)
      default:
        return
    }
  }
})

const users = ref<User[]>([])
const typingUserIds = ref<string[]>([])
const messages = ref<Message[]>([])
const activeUser = ref<User>(new User({ ...defaultUserProfile, ...localUser }))
const isLoading = reactive({
  users: true,
  messages: true,
})
const showUsersPanel = ref(false);
const showUserSettings = ref(false)
const showInfoModal = ref(false);
const breakpoints = useBreakpoints(breakpointsConfig)
const isDesktop = breakpoints.greater('lg')
const chatPanel = ref<typeof ChatPanel>()

const typingUsers = computed(() => {
  return users.value.filter(user => typingUserIds.value.includes(user.id) && user.id !== activeUser.value.id)
})

const sendData = (json: Request) => send(JSON.stringify(json))

// Send message
const sendMessage = (message: string) => {
  sendData({ type: 'message', data: { message } })
}

const sendUserProfileData = (data: EditableUserProfile) => {
  sendData({ type: 'profile', data })
  showUserSettings.value = false
}

const sendUserStatus = (status: UserStatus) => {
  sendData({ type: 'status', data: { status } })
}

const sendStopTypingIndicator = () => {
  if (!typingUserIds.value.includes(activeUser.value.id)) return;
  sendTypingIndicatorThrottle.cancel()
  sendData({ type: 'typing', data: { typing: false } })
}

const sendStopTypingIndicatorDebounce = debounce(() => {
  sendStopTypingIndicator()
}, typingIndicatorTimeout)

const sendTypingIndicatorThrottle = throttle(() => {
  sendData({ type: 'typing', data: { typing: true } })
}, typingIndicatorTimeout)


const sendTypingIndicator = () => {
  sendTypingIndicatorThrottle()
  sendStopTypingIndicatorDebounce()
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
  isLoading.messages = false;
  messages.value = data.map(message => new Message(message));
}

const onUsers = (data: UsersResponse['data']) => {
  isLoading.users = false
  users.value = [...data.map(user => new User(user))]
}

const onTypingUsers = (data: TypingUsersResponse['data']) => {
  typingUserIds.value = data
}

const onActiveUser = (data: ActiveUserResponse['data']) => {
  activeUser.value = new User(data)
  storeLocalUser({ username: data.username, image: data.image, colour: data.colour })
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
$header-height: 65px;

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
  height: $header-height;
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

  @include max-breakpoint($mobile-bp) {
    .chat-panel {
      max-height: calc(100vh - #{$header-height});
    }
  }

  @include min-breakpoint($mobile-bp) {
    grid-template-columns: 345px 1fr;
    gap: 50px;
    min-height: 600px;
    height: 80vh;
  }
}
</style>
