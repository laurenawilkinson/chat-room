<template>
  <button
    :class="`icon-button ${theme}`"
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
interface IconButtonProps {
  type?: 'button' | 'submit'
  disabled?: boolean
  theme?: 'primary' | 'grey'
}

withDefaults(defineProps<IconButtonProps>(), {
  type: 'button',
  disabled: false
})
</script>

<style lang="scss" scoped>
.icon-button {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c0c0c0;
  width: 30px;
  height: 30px;

  &:not(:disabled):hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &.primary {
    color: var(--primary-colour);
  }
}

:deep(svg) {
  width: 24px;
  height: 24px;
  stroke-width: 2;
}
</style>
