<template>
  <fieldset>
    <legend v-if="label">{{ label }}</legend>
    <slot />
  </fieldset>
</template>

<script lang="ts" setup>
interface FormFieldset {
  label?: string;
}

defineProps<FormFieldset>()
</script>

<style lang="scss" scoped>
fieldset {
  border: 0;
}

legend {
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--grey-65);
  margin-bottom: .75rem;
}

:deep(.form-error) {
  margin-top: .5rem;
}
</style>