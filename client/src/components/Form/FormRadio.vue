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
label {
  display: inline-flex;
  cursor: pointer;

  input {
    display: none;
  }
}
</style>