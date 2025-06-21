<template>
  <Teleport to="#toast-container">
    <TransitionGroup name="slide-up" tag="ul">
      <li v-for="toast in toasts" :key="toast.id">
        <ToastNotification :toast="toast" @close="closeToast(toast.id)" />
      </li>
    </TransitionGroup>
  </Teleport>
</template>

<script lang="ts" setup>
import ToastNotification from './ToastNotification.vue';
import { useToasterContext } from '@/contexts/useToasterContext';

const { toasts, closeToast } = useToasterContext()
</script>

<style lang="scss" scoped>
ul {
  position: fixed;
  width: 100%;
  max-width: 325px;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}
</style>