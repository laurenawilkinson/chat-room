<template>
  <li class="context-menu-item">
    <button @click="$emit('select')">
      <slot />
    </button>
  </li>
</template>

<style lang="scss" scoped>
button {
  border: 0;
  background: transparent;
  font-size: var(--14px);
  font-weight: var(--font-weight-semibold);
  padding: .5rem .75rem;
  display: flex;
  width: 100%;
  cursor: pointer;
  border-radius: .5rem;
  transition: background-color var(--transition-default);

  &:hover {
    background-color: var(--grey-15);
  }
}
</style>