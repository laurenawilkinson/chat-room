<template>
  <Teleport to="#modal-container">
    <Transition name="modal">
      <FocusTrap v-if="show" :initialFocus="getFirstFocusableEl">
        <div class="modal" role="dialog" aria-modal="true" @keydown.escape="closeModal">
          <div class="modal-inner" ref="modalRef" @click.stop>
            <IconButton label="Close modal" size="md" @click="closeModal">
              <IconSquareRoundedX />
            </IconButton>
            <div class="modal-body">
              <slot />
            </div>
            <div v-if="$slots.footer" class="modal-footer">
              <slot name="footer" :close="closeModal" />
            </div>
          </div>
        </div>
      </FocusTrap>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { FocusTrap } from 'focus-trap-vue'
import { onClickOutside } from '@vueuse/core';
import IconButton from './IconButton.vue';
import { IconSquareRoundedX } from '@tabler/icons-vue'
import { ref } from 'vue';

export interface ModalProps {
  show: boolean;
}

defineProps<ModalProps>()
const emit = defineEmits(['close'])

const modalRef = ref<HTMLElement | null>(null)

onClickOutside(modalRef, (e) => {
  closeModal()
  e.preventDefault()
  e.stopPropagation()
})

const closeModal = () => {
  emit('close')
}

const getFirstFocusableEl = () => {
  if (!modalRef.value) return

  return modalRef.value.querySelector(
    'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as HTMLElement | undefined
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/ui';

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  &-inner {
    background-color: white;
    max-width: 500px;
    width: 100%;
    position: relative;
    border-radius: 1rem;
    margin: 1rem;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    padding: 2.5rem 1rem 1.5rem 2rem;

    > button {
      position: absolute;
      top: .5rem;
      right: .5rem;
    }
  }

  &-body {
    padding-bottom: 1rem;
    padding-right: 1rem;
    flex: 1;
    overflow-y: auto;
    @include rounded-scrollbar;
  }

  &-footer {
    padding-top: 1rem;
    padding-right: 1rem;
    display: flex;
    gap: .5rem;
    justify-content: flex-end;
    flex-wrap: wrap;
    flex-shrink: 0;
  }
}
</style>

<style lang="scss">
.modal-enter-active,
.modal-leave-active {

  &,
  .modal-inner {
    transition: all .5s cubic-bezier(0, 0.55, 0.45, 1);
  }
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;

  .modal-inner {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal-inner {
    opacity: 0;
    transform: translateY(40px);
  }
}
</style>