<template>
  <button :class="`button ${theme} ${variant} ${size}`" :aria-label="label" :type="type" :disabled="disabled">
    <span>
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup>
interface ButtonProps {
  type?: 'button' | 'submit'
  disabled?: boolean
  theme?: 'primary' | 'grey'
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'xs' | 'sm' | 'md'
  label?: string;
}

withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  disabled: false,
  theme: 'primary',
  variant: 'solid',
  size: 'md'
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/ui';

.button {
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .65rem 1.25rem;
  font-weight: var(--font-weight-bold);
  border: 2px solid transparent;
  background-color: transparent;
  font-size: 1rem;
  transition: var(--transition-default);
  transition-property: background-color, color;
  position: relative;
  border-radius: .75rem;
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
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Themes */
  &.primary {
    --button-theme: var(--primary-colour);
  }

  &.grey {
    --button-theme: var(--grey-80);
  }

  /* Variants */
  &.solid {
    background-color: var(--button-theme);
    color: white;

    &::after {
      background: rgba(0, 0, 0, 0.1);
      opacity: 0;
    }

    &:not(:disabled):hover::after {
      opacity: 1;
    }
  }

  &.outline {
    border-color: var(--button-theme);
    color: var(--button-theme);

    &:not(:disabled):hover {
      background-color: var(--button-theme);
      color: white;
    }
  }

  &.ghost {
    color: var(--button-theme);

    &::after {
      background-color: var(--button-theme);
      opacity: 0;
      transform: scale(.8);
    }

    &:not(:disabled):hover {
      &::after {
        opacity: .1;
        transform: scale(1);
      }
    }
  }

  /* Sizes */
  &.xs {
    padding: .15rem .5rem;
    font-size: var(--12px);
    min-width: 55px;
  }

  &.sm {
    padding: .25rem .75rem;
    font-size: var(--14px);
    min-width: 70px;
  }

  &.md {
    padding: .65rem 1.25rem;
    font-size: 1rem;
    min-width: 90px;
  }

  > span {
    z-index: 1;
    position: relative;
  }
}
</style>
