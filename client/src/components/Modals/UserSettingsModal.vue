<template>
  <Modal :show="show">
    <form>
      <UserSettingsProfileImage v-model="form.image" :colour="form.colour" />
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
import { reactive, watch } from 'vue';

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
  emit('submit', form)
}
</script>