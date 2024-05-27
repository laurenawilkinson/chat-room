<template>
  <aside class="panel">
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

interface UserPanelProps {
  users: any[]
  activeUser: any
}

defineProps<UserPanelProps>()
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: inherit;
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
