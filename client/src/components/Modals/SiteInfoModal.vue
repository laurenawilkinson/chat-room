<template>
  <Modal :show="show">
    <p>Created by
      <Link href="https://laurenwilkinson.co.uk">Lauren Wilkinson</Link>
      <Link href="https://github.com/laurenawilkinson/chat-room">
      <IconBrandGithub />
      </Link>
    </p>
    <p>
      <small>
        Profile images created by
        <Link href="https://www.flaticon.com/packs/animals-54">Freepik - Flaticon</Link>
      </small>
    </p>
  </Modal>
</template>

<script lang="ts" setup>
import type { ModalProps } from '../UI/Modal.vue';
import Modal from '../UI/Modal.vue';
import Link from '../UI/Link.vue';
import { IconBrandGithub } from '@tabler/icons-vue';

defineProps<ModalProps>()
</script>

<style lang="scss" scoped>
p {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  + p {
    margin-top: .5rem;
  }
}

small {
  color: var(--grey-60);
  font-size: var(--14px);
}
</style>