<template>
  <aside class="panel" ref="panel">
    <IconButton label="Close users panel" size="lg" @click="closePanel">
      <IconSquareRoundedX />
    </IconButton>
    <header>
      <strong>Users</strong>
      <small v-show="onlineUsers.length > 0">
        <StatusIndicator v-show="onlineUsers.length > 0" status="online" :pulseOn="onlineUsers.length" />
        <span>{{ onlineUsers.length }} online</span>
      </small>
    </header>
    <ul>
      <li v-for="user in orderedUsers" :key="user.id">
        <StatusIndicator :status="user.status" :pulseOn="user.status === 'online'" />
        <strong>
          {{ user.username }} <span v-if="user.id === activeUser.id">(You)</span>
        </strong>
      </li>
    </ul>
    <UserPanelProfile :activeUser="activeUser" @click:settings="$emit('open:settings')" @send:status="sendStatus" />
  </aside>
</template>

<script lang="ts" setup>
import StatusIndicator from '@/components/StatusIndicator.vue'
import UserPanelProfile from './UserPanelProfile.vue'
import { onClickOutside } from '@vueuse/core'
import { IconSquareRoundedX } from '@tabler/icons-vue'
import IconButton from '@/components/UI/IconButton.vue'
import { computed, ref } from 'vue'
import type { UserStatus } from '~/types/user'
import type User from '@/models/User'

interface UserPanelProps {
  users: User[]
  activeUser: User
}

const props = defineProps<UserPanelProps>()
const emit = defineEmits(['close', 'open:settings', 'send:status'])

const panel = ref(null)

onClickOutside(panel, () => {
  closePanel()
})

const onlineUsers = computed(() => props.users.filter(user => user.status === 'online'))

const orderedUsers = computed(() => [...props.users].sort((a, b) => {
  const getOrder = (status: UserStatus) => {
    if (status === 'online') return 0
    if (status === 'away') return 1
    return 2
  }
  // Order by status
  const diff = getOrder(a.status) - getOrder(b.status)
  if (diff !== 0) return diff
  // Order alphabetically
  return a.username.toLowerCase().localeCompare(b.username.toLowerCase())
}))

const closePanel = () => {
  emit('close')
}

const sendStatus = (status: UserStatus) => {
  emit('send:status', status)
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/breakpoints';
@import '@/styles/mixins/ui';

.panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: inherit;
  position: relative;

  @include max-breakpoint($mobile-bp) {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    max-width: 300px;
    border-radius: 0;
    z-index: 10;
    box-shadow: -15px 0 15px rgba(0, 0, 0, .1);
  }

  > button {
    position: absolute;
    top: .75rem;
    right: .75rem;

    @include min-breakpoint($mobile-bp) {
      display: none;
    }
  }
}

.status-indicator {
  padding-bottom: 1px;
}

header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--20px);

  strong {
    font-weight: var(--font-weight-extrabold);
  }

  small {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: var(--14px);
    font-weight: var(--font-weight-semibold);

    span {
      color: var(--grey-65);
    }
  }
}

ul {
  flex: 1;
  overflow-y: auto;
  margin-inline: -1rem;
  @include rounded-scrollbar;
}

li {
  display: flex;
  align-items: center;
  gap: var(--10px);
  padding: 1rem;
  font-size: var(--14px);

  strong {
    font-weight: var(--font-weight-semibold);
  }

  span {
    font-weight: normal;
  }
}
</style>
