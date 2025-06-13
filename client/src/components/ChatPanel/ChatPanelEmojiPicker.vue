<template>
  <div class="emoji-picker" ref="pickerWrapper" @keydown.escape="showPicker = false">
    <IconButton label="Emoji picker" @click.stop="showPicker = !showPicker">
      <IconMoodSmileBeam />
    </IconButton>
    <Transition name="fade">
      <div v-if="showPicker" ref="picker">
        <EmojiPicker native @keydown.enter.stop @select="onSelectEmoji" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import IconButton from '../UI/IconButton.vue'
import { IconMoodSmileBeam } from '@tabler/icons-vue'
import EmojiPicker, { type EmojiExt } from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { onClickOutside } from '@vueuse/core'
import { getFirstFocusableElement } from '@/helpers/utils'

const emit = defineEmits(['select'])

const showPicker = ref(false)
const pickerWrapper = ref(null)
const picker = ref<HTMLElement | null>(null)

onClickOutside(pickerWrapper, () => {
  showPicker.value = false
})

watch(showPicker, async (show) => {
  if (show) {
    await nextTick()
    const focusableEl = getFirstFocusableElement(picker.value, 'input[type="text"]');
    if (focusableEl) focusableEl.focus()
  }
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
