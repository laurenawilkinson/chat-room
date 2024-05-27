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
      <input v-model="message" placeholder="Type a message" :maxlength="maxMessageLength" />
      <aside>
        <IconButton type="submit" theme="primary">
          <IconMessageForward />
        </IconButton>
      </aside>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { IconMessageForward } from '@tabler/icons-vue'
import { ref } from 'vue'
import IconButton from '@/components/UI/IconButton.vue'

interface ChatPanelProps {
  messages: any[]
}

defineProps<ChatPanelProps>()
const emit = defineEmits(['send:message'])

const message = ref('')
const maxMessageLength = 250

const sendMessage = () => {
  if (message.value.length === 0 || message.value.length > maxMessageLength) return

  emit('send:message', message.value)
  message.value = ''
}

const messageList = ref<HTMLDivElement>()
const scrollToNewestMessage = () => {
  if (!messageList.value) return

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
  $aside-width: 30px; // Icon button width
  display: flex;
  position: relative;

  input {
    padding-right: calc(var(--20px) + #{$aside-width} + 0.5rem);
  }

  aside {
    display: flex;
    gap: 1rem;
    position: absolute;
    top: var(--18px);
    right: var(--18px);
  }
}
</style>
