<template>
  <p class="form-error">
    <slot />
  </p>
</template>

<style lang="scss" scoped>
.form-error {
  color: red;
  font-size: var(--14px);
  font-weight: var(--font-weight-semibold);
}
</style>