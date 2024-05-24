<template>
  <aside class="panel">
    <header>
      <strong>Users</strong>
      <small>{{ users.length }} online</small>
    </header>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.username }} <template v-if="user.id === activeUser.id">(You)</template>
      </li>
    </ul>
    <div>
      <strong>{{ activeUser.username }}</strong>
    </div>
  </aside>
</template>

<script lang="ts" setup>
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
  padding: 2rem 1.5rem;
  gap: 1.5rem;
}

ul {
  flex: 1;
  overflow-y: auto;
}
</style>
