<template>
  <div class="emoji-picker" ref="pickerWrapper" @keydown.escape="showPicker = false">
    <IconButton label="Emoji picker" @click.stop="showPicker = !showPicker">
      <IconMoodSmileBeam />
    </IconButton>
    <Transition name="pop-up">
      <div v-if="showPicker" ref="picker">
        <EmojiPicker :group-icons="groupIcons" native @keydown.enter.stop @select="onSelectEmoji" />
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
const groupIcons = {
  "smileys_people": "/images/icons/mood-smile.svg",
  "animals_nature": "/images/icons/seedling.svg",
  "food_drink": "/images/icons/bubble-tea.svg",
  "activities": "/images/icons/bowling.svg",
  "travel_places": "/images/icons/world.svg",
  "objects": "/images/icons/music.svg",
  "symbols": "/images/icons/asterisk.svg",
  "flags": "/images/icons/flag.svg"
}

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
@import '@/styles/mixins/ui';
@import '@/styles/mixins/form';

.emoji-picker {
  position: relative;

  > div {
    $width: 280px;
    position: absolute;
    bottom: 100%;
    left: calc(#{$width} / 2 * -1);
    width: $width;
  }

  .v3-emoji-picker {
    --v3-picker-border: var(--grey-20);
    --v3-picker-input-border: var(--grey-20);
    --v3-picker-input-focus-border: var(--primary-colour);
    --v3-picker-emoji-hover: var(--grey-10);
    width: 100%;
    box-shadow: var(--subtle-box-shadow);
    border: 2px solid var(--v3-picker-border);
    height: 350px;

    :deep(h5) {
      color: var(--grey-60);
      font-size: var(--14px);
    }
  }

  :deep(.v3-header) {
    padding: 1rem .75rem .75rem;

    .v3-group,
    .v3-group:first-child,
    .v3-group:last-child {
      flex: 1;
    }

    .v3-group:not(:hover) {
      opacity: .3;
    }
  }

  :deep(.v3-search) {
    position: relative;
    $icon-size: 24px;

    &::after {
      content: '';
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%23b0b3ba' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0M21 21l-6-6'/%3E%3C/svg%3E");
      width: $icon-size;
      height: $icon-size;
      position: absolute;
      right: 0.5rem;
      top: 0;
      bottom: 0;
      margin: auto;
    }

    input {
      @include form-input(sm);
      height: auto;
      padding-right: calc(#{$icon-size} + .75rem);
    }
  }

  :deep(.v3-foot-left) {
    opacity: 0;
  }

  :deep(.v3-footer) {
    padding: .5rem;
  }

  :deep(.v3-body) {
    padding-left: 0;
    padding-bottom: .75rem;

    h5.v3-sticky {
      margin-inline: -.5rem;
      padding-inline: .75rem;
    }

    .v3-group .v3-emojis {
      padding-top: .25rem;

      button {
        transition: background-color var(--transition-default);
        border-radius: .5rem;
      }
    }
  }

  :deep(.v3-body-inner) {
    padding-inline: 0.75rem;
    padding-bottom: 0.5rem;
    @include rounded-scrollbar;
    scrollbar-width: auto;
  }

  :deep(.v3-tone) {
    transition: background-color var(--transition-default);
    padding: .25rem .5rem;
    border-radius: .5rem;
    color: var(--grey-75);
    font-weight: var(--font-weight-medium);

    &:hover {
      background-color: var(--grey-10);
    }

    .v3-icon {
      $size: var(--18px);
      border-radius: $size;
      width: $size;
      height: $size;
      border: 0;
    }
  }

  :deep(.v3-skin-tone) {
    $border-radius: .5rem;

    &:first-of-type {
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
    }

    &:last-of-type {
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
  }
}
</style>
