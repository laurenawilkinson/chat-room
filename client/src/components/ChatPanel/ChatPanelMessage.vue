<template>
  <div class="chat-panel-message">
    <div>
      <strong :style="{ color: user.colour }">{{ user.username }}</strong>
      <small>{{ dateString }}</small>
    </div>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts" setup>
import { format, isToday } from 'date-fns'
import { computed } from 'vue'
import type { UserProfile } from '~/types/user'

interface ChatPanelMessageProps {
  user: UserProfile
  message: string
  date: string
}

const props = defineProps<ChatPanelMessageProps>()

const dateString = computed(() => {
  const date = new Date(props.date)
  const formatString = isToday(date) ? `'Today' HH:mm` : 'dd/MM/yyyy HH:mm'

  return format(date, formatString)
})
</script>

<style lang="scss" scoped>
.chat-panel-message {
  padding: 0.25rem 0.5rem;
  line-height: 1.4;

  > div {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin-bottom: 0.25rem;
  }

  strong {
    font-size: var(--14px);
    font-weight: var(--font-weight-bold);
  }

  small {
    color: #a3a3a3;
    font-size: var(--10px);
  }
}
</style>
