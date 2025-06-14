<template>
  <button :class="`icon-button ${theme} ${size}`" :type="type" :aria-label="label" :disabled="disabled">
    <slot />
  </button>
</template>

<script lang="ts" setup>
interface IconButtonProps {
  type?: 'button' | 'submit'
  disabled?: boolean
  theme?: 'primary' | 'grey'
  size?: 'sm' | 'md' | 'lg'
  label: string;
}

withDefaults(defineProps<IconButtonProps>(), {
  type: 'button',
  disabled: false,
  size: 'sm',
  theme: 'grey'
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/ui';

.icon-button {
  --icon-size: 1.5rem;
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--icon-button-theme);
  padding: .25rem;
  border-radius: .75rem;
  position: relative;
  @include focus-outline;

  &:not(:disabled):hover {
    cursor: pointer;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    transition: var(--transition-default);
    border-radius: inherit;
    background-color: var(--icon-button-theme);
    opacity: 0;
    transform: scale(.8);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:not(:disabled):hover {
    &::after {
      opacity: .1;
      transform: scale(1);
    }
  }

  /* Themes */
  &.primary {
    --icon-button-theme: var(--primary-colour);
  }

  &.grey {
    --icon-button-theme: var(--grey-50);
  }

  /* Sizes */
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
