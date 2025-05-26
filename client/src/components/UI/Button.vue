<template>
  <button :class="`button ${theme} ${variant}`" :type="type" :disabled="disabled">
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
}

withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  disabled: false,
  theme: 'primary',
  variant: 'solid'
})
</script>

<style lang="scss" scoped>
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
  transition: .2s ease-out;
  transition-property: background-color, color;
  position: relative;
  border-radius: .75rem;
  min-width: 90px;

  &:not(:disabled):hover {
    cursor: pointer;
  }

  &:focus-visible {
    outline: 2px solid black;
    outline-offset: 2px;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    transition: .2s ease-out;
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
    --button-theme: #4e4e4e;
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

  > span {
    z-index: 1;
    position: relative;
  }
}
</style>
