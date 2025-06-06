<template>
  <section class="panel">
    <div class="chat-panel-messages">
      <div class="message-list" ref="messageList">
        <TransitionGroup name="slide-up" tag="ul">
          <li v-for="(item, index) in messages" :key="index">
            <ChatPanelMessage :user="item.user" :message="item.message" :date="item.date" />
          </li>
        </TransitionGroup>
      </div>
      <p v-if="!isLoading && messages.length === 0" class="chat-panel-no-data">
        No messages to display. Why not start the conversation?
      </p>
      <Transition name="pop-up">
        <small v-if="typingUsers.length > 0" class="chat-panel-typing-indicator">
          <strong v-if="typingUsers.length > 1">{{ typingUsers.length }} users typing</strong>
          <template v-else><strong>{{ typingUsers[0].username }}</strong> is typing</template>
        </small>
      </Transition>
    </div>
    <form @submit.prevent="sendMessage">
      <input v-model.trim="message" placeholder="Type a message" :maxlength="maxMessageLength"
        @input="sendTypingIndicator" @blur="sendStopTypingIndicator" />
      <aside>
        <ChatPanelEmojiPicker @select="appendEmojiToMessage" />
        <IconButton type="submit" theme="primary" :disabled="!canSendMessage">
          <IconMessageForward />
        </IconButton>
      </aside>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { IconMessageForward } from '@tabler/icons-vue'
import { computed, ref } from 'vue'
import IconButton from '@/components/UI/IconButton.vue'
import ChatPanelMessage from '@/components/ChatPanel/ChatPanelMessage.vue'
import ChatPanelEmojiPicker from './ChatPanelEmojiPicker.vue'
import Message from '@/models/Message'
import { censorProfanity } from '@/helpers/utils'
import type User from '@/models/User'

interface ChatPanelProps {
  messages: Message[]
  isLoading: boolean;
  typingUsers: User[];
}

defineProps<ChatPanelProps>()
const emit = defineEmits(['send:message', 'send:typing', 'send:stopTyping'])

const message = ref('')
const maxMessageLength = 250

const canSendMessage = computed(
  () => message.value.length > 0 && message.value.length <= maxMessageLength
)

const sendMessage = () => {
  if (!canSendMessage.value) return

  emit('send:message', censorProfanity(message.value))
  message.value = ''
}

const sendTypingIndicator = () => {
  if (message.value.length === 0) return sendStopTypingIndicator();
  emit('send:typing')
}

const sendStopTypingIndicator = () => {
  emit('send:stopTyping')
}

const appendEmojiToMessage = (emoji: string) => {
  message.value += emoji
}

const messageList = ref<HTMLDivElement>()
const scrollToNewestMessage = () => {
  if (!messageList.value) return

  messageList.value.scrollTop = messageList.value.scrollHeight
}

defineExpose({ scrollToNewestMessage })
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/breakpoints';
@import '@/styles/mixins/ui';

.panel {
  display: flex;
  flex-direction: column;
  height: inherit;

  @include max-breakpoint($mobile-bp) {
    border-radius: 0;
    padding: 1rem;
  }
}

.message-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  @include rounded-scrollbar;
}

.chat-panel {
  &-no-data {
    color: var(--grey-50);
    text-align: center;
    font-weight: var(--font-weight-medium);
    margin-bottom: 2rem;
    line-height: 1.4;
  }

  &-messages {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
  }

  &-typing-indicator {
    position: absolute;
    left: .75rem;
    bottom: .5rem;
    font-size: var(--12px);
    font-weight: var(--font-weight-medium);
    color: var(--grey-55);

    &::after {
      content: '';
      animation: typing 1s infinite;

      @keyframes typing {
        0% {
          content: ''
        }

        25% {
          content: '.'
        }

        50% {
          content: '..'
        }

        75% {
          content: '...'
        }
      }
    }

    strong {
      font-weight: var(--font-weight-bold);
    }
  }
}

ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1.5rem;
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
    align-items: center;
    gap: 1rem;
    position: absolute;
    top: 0;
    right: var(--18px);
    height: 100%;
  }
}
</style>
