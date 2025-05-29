<template>
  <Modal :show="show">
    <form @submit.prevent>
      <UserSettingsProfileUsername v-model="form.username" :image="form.image" :isAnonymous="user.isAnonymous()"
        :error="usernameError" />
      <UserSettingsProfileImage v-model="form.image" :colour="form.colour" />
      <UserSettingsProfileColour v-model="form.colour" />
    </form>
    <template #footer="{ close }">
      <Button theme="grey" variant="ghost" @click="close">Cancel</Button>
      <Button @click="submitForm">Save</Button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import type { ModalProps } from '../UI/Modal.vue';
import Modal from '../UI/Modal.vue';
import Button from '../UI/Button.vue';
import type User from '@/models/User';
import UserSettingsProfileImage from '../UserSettings/UserSettingsProfileImage.vue';
import { reactive, ref, watch } from 'vue';
import UserSettingsProfileColour from '../UserSettings/UserSettingsProfileColour.vue';
import UserSettingsProfileUsername from '../UserSettings/UserSettingsProfileUsername.vue';
import { usernameMaxLength } from '@/helpers/user';
import { hasProfanity } from '@/helpers/utils';

interface UserPanelSettingsModalProps extends ModalProps {
  user: User;
}

const props = defineProps<UserPanelSettingsModalProps>()
const emit = defineEmits(['submit'])

const form = reactive({
  username: props.user._username,
  colour: props.user.colour,
  image: props.user.image,
})
const usernameError = ref('')

const resetForm = () => {
  form.username = props.user._username
  form.colour = props.user.colour
  form.image = props.user.image
}

watch(
  () => props.show,
  (show) => {
    if (show) {
      resetForm()
    }
  }
)

const submitForm = () => {
  usernameError.value = ''
  const username = !form.username ? 'Anonymous' : form.username;

  // Validate username
  if (username.length > usernameMaxLength) {
    usernameError.value = `Must be less than ${usernameMaxLength} characters`
    return
  }

  if (hasProfanity(username)) {
    usernameError.value = 'Username not allowed'
    return
  }

  emit('submit', {
    ...form,
    username,
  })
}
</script>

<style lang="scss" scoped>
form {
  fieldset + fieldset {
    margin-top: 2rem;
  }
}
</style>