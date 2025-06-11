<template>
  <div class="chat-panel-message" :style="{ '--user-colour': userColours[user.colour] }">
    <ProfileImage :image="user.image" />
    <div>
      <strong>{{ user.username }}</strong>
      <small>{{ dateString }}</small>
    </div>
    <img v-if="isGif" :src="message" alt="Animated GIF" />
    <p v-else>{{ message }}</p>
  </div>
</template>

<script lang="ts" setup>
import { format, isToday } from 'date-fns'
import { computed } from 'vue'
import { userColours } from '~/helpers/user'
import type User from '@/models/User'
import ProfileImage from '../UI/ProfileImage.vue'

interface ChatPanelMessageProps {
  user: User
  message: string
  date: string
  isGif: boolean
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
  display: grid;
  grid-template-columns: auto 1fr;
  gap: .25rem 1rem;

  > figure {
    grid-row: span 2;
  }

  > div {
    grid-column: 2;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  strong {
    font-size: var(--14px);
    font-weight: var(--font-weight-bold);
    color: var(--user-colour);
  }

  small {
    color: #a3a3a3;
    font-size: var(--10px);
  }

  p,
  img {
    grid-column: 2;
  }
}
</style>
