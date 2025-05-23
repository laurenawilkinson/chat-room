<template>
  <div class="emoji-picker" ref="picker">
    <IconButton @click.stop="showPicker = !showPicker">
      <IconMoodSmileBeam />
    </IconButton>
    <Transition name="fade">
      <EmojiPicker v-if="showPicker" native @keydown.enter.prevent @select="onSelectEmoji" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconButton from '../UI/IconButton.vue'
import { IconMoodSmileBeam } from '@tabler/icons-vue'
import EmojiPicker, { type EmojiExt } from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { onClickOutside } from '@vueuse/core'

const emit = defineEmits(['select'])

const showPicker = ref(false)
const picker = ref(null)

onClickOutside(picker, () => {
  showPicker.value = false
})

const onSelectEmoji = ({ i }: EmojiExt) => {
  emit('select', i)
}
</script>

<style lang="scss" scoped>
.emoji-picker {
  position: relative;

  .v3-emoji-picker {
    $width: 280px;
    position: absolute;
    bottom: 100%;
    left: calc(#{$width} / 2 * -1);
    width: $width;
  }
}
</style>
