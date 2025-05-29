<template>
  <FormFieldset label="Image">
    <div class="profile-images">
      <FormRadio v-for="image in userImages" :key="image" v-model="modelValue" :id="image" :value="image" name="images">
        <template #default="{ selected }">
          <ProfileImage :image="image" :colour="selected ? colour : ''" />
        </template>
      </FormRadio>
    </div>
  </FormFieldset>
</template>

<script setup lang="ts">
import { userImages } from '~/helpers/user';
import FormFieldset from '../Form/FormFieldset.vue';
import FormRadio from '../Form/FormRadio.vue';
import { useVModel } from '@vueuse/core';
import ProfileImage from '../UI/ProfileImage.vue';
import type { UserColour, UserImage } from '~/types/user';

interface UserSettingsProfileImage {
  modelValue: UserImage;
  colour: UserColour;
}

const props = defineProps<UserSettingsProfileImage>()
const emit = defineEmits(['update:modelValue'])
const modelValue = useVModel(props, 'modelValue', emit)
</script>

<style lang="scss" scoped>
.profile-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: .5rem;

  > label {
    figure {
      --profile-image-size: 100%;
    }
  }
}
</style>