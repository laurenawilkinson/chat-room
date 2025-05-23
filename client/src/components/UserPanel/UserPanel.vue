<template>
  <aside class="panel" ref="panel">
    <IconButton size="lg" @click="closePanel">
      <IconSquareRoundedX />
    </IconButton>
    <header>
      <strong>Users</strong>
      <small v-if="users.length > 0">
        <StatusIndicator status="online" />
        <span>{{ users.length }} online</span>
      </small>
    </header>
    <ul>
      <li v-for="user in users" :key="user.id">
        <StatusIndicator :status="user.status" />
        {{ user.username }} <template v-if="user.id === activeUser.id">(You)</template>
      </li>
    </ul>
    <UserPanelProfile :activeUser="activeUser" />
  </aside>
</template>

<script lang="ts" setup>
import StatusIndicator from '@/components/StatusIndicator.vue'
import UserPanelProfile from './UserPanelProfile.vue'
import { onClickOutside } from '@vueuse/core'
import { IconSquareRoundedX } from '@tabler/icons-vue'
import IconButton from '@/components/UI/IconButton.vue'
import { ref } from 'vue'

interface UserPanelProps {
  users: any[]
  activeUser: any
}

defineProps<UserPanelProps>()
const emit = defineEmits(['close'])

const panel = ref(null)

onClickOutside(panel, () => {
  closePanel()
})

const closePanel = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/breakpoints';

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
  }
}

ul {
  flex: 1;
  overflow-y: auto;
}

li {
  display: flex;
  align-items: center;
  gap: var(--10px);
  font-weight: var(--font-weight-medium);
  padding-block: 1rem;
  font-size: var(--14px);
}
</style>
