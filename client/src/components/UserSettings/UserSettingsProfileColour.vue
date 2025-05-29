<template>
  <FormFieldset label="Colour">
    <div class="profile-colours">
      <FormRadio v-for="(hex, colour) in userColours" :key="colour" v-model="modelValue" :id="colour" :value="colour"
        name="colours">
        <template #default="{ selected }">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11" :stroke="hex" stroke-width="1" fill="none"
              :style="{ strokeOpacity: selected ? 1 : 0 }" />
            <circle cx="12" cy="12" r="9" :fill="hex" />
          </svg>
        </template>
      </FormRadio>
    </div>
  </FormFieldset>
</template>

<script setup lang="ts">
import { userColours } from '~/helpers/user';
import FormFieldset from '../Form/FormFieldset.vue';
import FormRadio from '../Form/FormRadio.vue';
import { useVModel } from '@vueuse/core';
import type { UserColour } from '~/types/user';

interface UserSettingsProfileColour {
  modelValue: UserColour;
}

const props = defineProps<UserSettingsProfileColour>()
const emit = defineEmits(['update:modelValue'])
const modelValue = useVModel(props, 'modelValue', emit)
</script>

<style lang="scss" scoped>
.profile-colours {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: .5rem;

  svg {
    width: 100%;
    height: auto;

    circle {
      transition: stroke-opacity 0.2s ease-out;
    }
  }
}
</style>