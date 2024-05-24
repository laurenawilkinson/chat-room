<template>
  <section class="panel">
    <ul>
      <li v-for="(item, index) in messages" :key="index">
        <strong>{{ item.user.username }}</strong>
        <p>{{ item.message }}</p>
      </li>
    </ul>
    <form @submit.prevent="sendMessage">
      <input v-model="message" placeholder="Type a message" />
      <button type="submit">Send</button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface ChatPanelProps {
  messages: any[]
}

defineProps<ChatPanelProps>()
const emit = defineEmits(['send:message'])

const message = ref('')

const sendMessage = () => {
  emit('send:message', message.value)
  message.value = ''
}
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1.5rem;
}

ul {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
}
</style>
