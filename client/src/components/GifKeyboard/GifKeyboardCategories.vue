<template>
  <ul>
    <template v-if="isLoading">
      <li v-for="(_, index) in Array(6)" :key="index"></li>
    </template>
    <TransitionGroup name="fade">
      <template v-if="!isLoading">
        <li v-for="category in categories" :key="category.searchterm">
          <button :style="{ backgroundImage: `url(${category.image})` }" @click="$emit('select', category.searchterm)">
            <span>{{ category.name }}</span>
          </button>
        </li>
      </template>
    </TransitionGroup>
  </ul>
</template>

<script lang="ts" setup>
import type { GifCategory } from '@/types/tenor';

interface GifKeyboardCategoriesProps {
  categories: GifCategory[];
  isLoading: boolean;
}

defineProps<GifKeyboardCategoriesProps>()
defineEmits(['select'])
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/ui';

ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .5rem;
  width: 100%;
}

li {
  width: 100%;
  aspect-ratio: 2 / 1.25;
  background-color: var(--grey-10);
  border-radius: 1rem;
  overflow: hidden;
}

button {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  color: white;
  padding: .5rem;
  word-break: break-all;
  background-size: cover;
  font-size: 1rem;
  @include button-focus;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: .2s ease-out;
  }

  &:hover {
    &::after {
      background-color: rgba(0, 0, 0, .6);
      backdrop-filter: blur(5px);
    }
  }

  span {
    position: relative;
    z-index: 1;
    font-weight: var(--font-weight-semibold);
  }
}
</style>