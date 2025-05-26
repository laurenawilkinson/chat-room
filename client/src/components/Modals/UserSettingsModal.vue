<template>
  <Modal :show="show">
    <template #footer="{ close }">
      <Button theme="grey" variant="ghost" @click="close">Cancel</Button>
      <Button>Save</Button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import type { ModalProps } from '../UI/Modal.vue';
import Modal from '../UI/Modal.vue';
import Button from '../UI/Button.vue';
import type { UserProfile } from '~/types/user';

interface UserPanelSettingsModalProps extends ModalProps {
  user: UserProfile;
}

defineProps<UserPanelSettingsModalProps>()
</script>