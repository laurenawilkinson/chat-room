<template>
  <section class="panel">
    <div class="message-list" ref="messageList">
      <ul>
        <li v-for="(item, index) in messages" :key="index">
          <strong>{{ item.user.username }}</strong>
          <p>{{ item.message }}</p>
        </li>
      </ul>
    </div>
    <form @submit.prevent="sendMessage">
      <textarea
        v-model="message"
        placeholder="Type a message"
        :rows="2"
        @keydown.enter.prevent="sendMessage"
      />
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

const messageList = ref<HTMLDivElement>()
const scrollToNewestMessage = () => {
  messageList.value.scrollTop = messageList.value.scrollHeight
}

defineExpose({ scrollToNewestMessage })
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: inherit;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

li {
  padding: 0.25rem 0.5rem;
  line-height: 1.4;

  strong {
    font-size: var(--14px);
    font-weight: var(--font-weight-semibold);
  }
}

form {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
