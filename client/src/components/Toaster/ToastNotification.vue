<template>
  <div :class="`toast ${toast.type}`">
    <Component :is="toastIcon" />
    <strong>{{ toast.title }}</strong>
    <span v-if="toast.description">{{ toast.description }}</span>
    <IconButton v-if="!toast.hideClose" label="Close notification" size="sm" @click="$emit('close')">
      <IconSquareRoundedX />
    </IconButton>
  </div>
</template>

<script lang="ts" setup>
import type { Toast } from '@/types/app';
import { IconCircleCheck, IconExclamationCircle, IconInfoCircle, IconSquareRoundedX } from '@tabler/icons-vue';
import { computed } from 'vue';
import IconButton from '../UI/IconButton.vue';

interface ToastProps {
  toast: Toast;
}

const props = defineProps<ToastProps>()
defineEmits(['close'])

const toastIcon = computed(() => {
  switch (props.toast.type) {
    case 'success':
      return IconCircleCheck;
    case 'error':
      return IconExclamationCircle;
    default:
      return IconInfoCircle;
  }
})
</script>

<style lang="scss" scoped>
.toast {
  display: grid;
  align-items: center;
  grid-template-columns: var(--24px) 1fr auto;
  gap: .15rem .5rem;
  width: 100%;
  padding: 1rem .75rem;
  border-radius: 1rem;
  background-color: color-mix(in srgb, white 85%, var(--toast-theme, white) 15%);
  border: 2px solid var(--toast-theme, var(--grey-20));
  box-shadow: var(--subtle-shadow);
  color: color-mix(in srgb, var(--toast-text) 60%, black 40%);

  &:has(.icon-button) {
    padding-right: .5rem;
  }

  .icon-button {
    --icon-button-theme: color-mix(in srgb, var(--toast-text) 70%, white 20%);
    grid-column: 3;
    grid-row: span 2;
  }

  > svg {
    width: var(--24px);
    height: var(--24px);
    stroke: var(--toast-text);
  }

  span {
    font-size: var(--14px);
    opacity: .75;
    line-height: 1.25;
    grid-column: 2;
    grid-row: 2;
  }

  &.error {
    --toast-theme: var(--red);
    --toast-text: var(--red-dark);
  }

  &.success {
    --toast-theme: var(--green);
    --toast-text: var(--green-dark);
  }
}
</style>