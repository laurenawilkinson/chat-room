<template>
  <label :for="id" :class="{ selected: selected }">
    <input v-model="modelValue" :id="id" :name="name" :value="value" type="radio" />
    <slot :selected="selected" />
  </label>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { computed } from 'vue';

interface FormRadio {
  modelValue: string;
  value: string;
  id: string;
  name?: string;
}

const props = defineProps<FormRadio>()
const emit = defineEmits(['update:modelValue'])
const modelValue = useVModel(props, 'modelValue', emit)

const selected = computed(() => modelValue.value === props.value)
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/ui';

label {
  display: inline-flex;
  cursor: pointer;
  position: relative;
  border-radius: .5rem;

  &:has(input:focus-visible) {
    @include focus-outline(black, true);
  }

  input {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>