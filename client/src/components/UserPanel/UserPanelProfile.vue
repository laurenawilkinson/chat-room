<template>
  <div class="user-panel-profile">
    <strong>{{ activeUser.username }}</strong>
    <StatusIndicator :status="activeUser.status" showLabel />
  </div>
</template>

<script lang="ts" setup>
import StatusIndicator from '@/components/StatusIndicator.vue'

interface UserPanelProfileProps {
  activeUser: any
}

defineProps<UserPanelProfileProps>()
</script>

<style lang="scss" scoped>
strong {
  display: block;
  margin-bottom: 0.25rem;
}
</style>
