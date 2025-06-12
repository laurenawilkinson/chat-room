<template>
  <FormFieldset label="Username">
    <div class="form-input">
      <input v-model="localValue" :placeholder="anonymousUsername" :maxlength="usernameMaxLength" />
      <Transition name="fade">
        <aside v-if="localValue.length > 0">
          <IconButton label="Clear username" size="sm" @click="localValue = ''">
            <IconCircleDashedX />
          </IconButton>
        </aside>
      </Transition>
    </div>
    <FormError v-if="showError && error">{{ error }}</FormError>
  </FormFieldset>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import FormFieldset from '../Form/FormFieldset.vue';
import { getAnimalFromImage, usernameMaxLength } from '@/helpers/user';
import type { UserImage } from '~/types/user';
import IconButton from '../UI/IconButton.vue';
import { IconCircleDashedX } from '@tabler/icons-vue';
import FormError from '../Form/FormError.vue';

interface UserSettingsProfileUsername {
  modelValue: string;
  image: UserImage;
  isAnonymous: boolean;
  error?: string;
}

const props = defineProps<UserSettingsProfileUsername>()
const emit = defineEmits(['update:modelValue'])
const localValue = ref(props.isAnonymous ? '' : props.modelValue)
const showError = ref(false);

const anonymousUsername = computed(() => `Anonymous ${getAnimalFromImage(props.image)}`)

watch(localValue, (value) => {
  showError.value = false;
  emit('update:modelValue', value)
})

watch(() => props.error, (error) => {
  if (error && error.length > 0) showError.value = true
})
</script>

<style lang="scss" scoped>
.form-input {
  position: relative;

  input {
    padding-right: 2.5rem;
  }

  aside {
    position: absolute;
    top: 0;
    bottom: 0;
    right: .5rem;
    margin: auto;
    display: flex;
    align-items: center;
  }
}
</style>