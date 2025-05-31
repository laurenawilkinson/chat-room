<template>
  <div class="context-menu" ref="containerRef">
    <slot name="toggle" :toggleMenu="toggleMenu" :isOpen="isOpen" />

    <Transition name="context-menu">
      <ul v-if="isOpen" class="context-menu-items" :class="{ above: menuPosition === 'above' }" ref="menuRef">
        <slot :closeMenu="closeMenu" />
      </ul>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import { nextTick, ref } from 'vue';

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const menuPosition = ref<'below' | 'above'>('below')

onClickOutside(containerRef, () => {
  isOpen.value = false
})

const toggleMenu = async () => {
  const newValue = !isOpen.value;
  isOpen.value = newValue
  if (newValue) {
    await nextTick();
    adjustMenuPosition();
  }
}

const closeMenu = () => {
  isOpen.value = false
}

const adjustMenuPosition = () => {
  if (!menuRef.value || !containerRef.value) return

  const menuRect = menuRef.value.getBoundingClientRect()
  const containerRect = containerRef.value.getBoundingClientRect()

  const spaceBelow = window.innerHeight - containerRect.bottom
  const spaceAbove = containerRect.top

  if (spaceBelow >= menuRect.height || spaceBelow > spaceAbove) {
    menuPosition.value = 'below'
  } else {
    menuPosition.value = 'above'
  }
}
</script>

<style lang="scss" scoped>
.context-menu {
  position: relative;
  display: inline-flex;
}

.context-menu-items {
  --context-menu-items-translate-y: -.5rem;
  position: absolute;
  top: calc(100% + .5rem);
  left: 50%;
  transform: translateX(-50%);
  min-width: 110px;
  background-color: white;
  border: 2px solid var(--grey-20);
  box-shadow: 0 3px 6px #849eb025;
  border-radius: .75rem;
  padding: .5rem;
  transform-origin: top center;

  &::after {
    content: '';
    position: absolute;
    top: -.5rem;
    left: 0;
    right: 0;
    margin: auto;
    border-width: 0 .5rem .5rem .5rem;
    border-style: solid;
    border-color: transparent transparent white transparent;
    display: block;
    width: 0;
    height: 0;
    z-index: 1;
    filter: drop-shadow(0 -2px 0 var(--grey-20));
  }

  &.above {
    --context-menu-items-translate-y: .5rem;
    top: auto;
    bottom: calc(100% + .5rem);
    transform-origin: bottom center;

    &::after {
      top: auto;
      bottom: -.5rem;
      border-width: .5rem .5rem 0 .5rem;
      border-color: white transparent transparent transparent;
      filter: drop-shadow(0 2px 0 var(--grey-20));
    }
  }
}

.context-menu-enter-active,
.context-menu-leave-active {
  transition: 0.25s ease-out;
  transition-property: opacity, transform;
}

.context-menu-enter-from,
.context-menu-leave-to {
  opacity: 0;
  transform: translate(-50%, var(--context-menu-items-translate-y)) scale(.8);
}
</style>