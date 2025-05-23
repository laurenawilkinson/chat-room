<template>
  <button :class="`icon-button ${theme} ${size}`" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<script lang="ts" setup>
interface IconButtonProps {
  type?: 'button' | 'submit'
  disabled?: boolean
  theme?: 'primary' | 'grey'
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<IconButtonProps>(), {
  type: 'button',
  disabled: false,
  size: 'sm'
})
</script>

<style lang="scss" scoped>
.icon-button {
  --icon-size: 1.5rem;
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c0c0c0;
  padding: .25rem;

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

  &.md {
    --icon-size: 1.75rem;
  }

  &.lg {
    --icon-size: 2rem;
  }
}

:deep(svg) {
  width: var(--icon-size);
  height: var(--icon-size);
  stroke-width: 2;
}
</style>
