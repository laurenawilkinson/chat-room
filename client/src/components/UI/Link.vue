<template>
  <a :href="href" target="_blank" rel="noreferrer">
    <slot />
  </a>
</template>

<script lang="ts" setup>
interface LinkProps {
  href: string;
  theme?: 'primary';
}

defineProps<LinkProps>()
</script>

<style lang="scss" scoped>
a {
  --link-theme: currentColor;
  text-decoration: none;
  color: var(--link-theme);
  font-weight: var(--font-weight-bold);
  display: inline-flex;
  padding: .25em;
  cursor: pointer;
  position: relative;
  border-radius: .375rem;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    transition: var(--transition-default);
    border-radius: inherit;
    background-color: var(--link-theme);
    opacity: 0;
    transform: scale(.8);
  }

  &:hover {
    &::after {
      opacity: .1;
      transform: scale(1);
    }
  }

  :deep(svg) {
    width: 1.5em;
    height: 1.5em;
  }

  /* Themes */
  &.primary {
    --link-theme: var(--primary-color);
  }
}
</style>