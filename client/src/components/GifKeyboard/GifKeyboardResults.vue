<template>
  <ul>
    <template v-if="isLoading">
      <li v-for="(_, index) in Array(6)" :key="index"></li>
    </template>
    <TransitionGroup name="fade">
      <template v-if="!isLoading">
        <li v-for="result in results" :key="result.id">
          <button @click="$emit('select', getUrl(result))">
            <img :src="getUrl(result)" :alt="result.content_description" />
          </button>
        </li>
      </template>
    </TransitionGroup>
  </ul>
</template>

<script lang="ts" setup>
import type { GifResult } from '@/types/tenor';

interface GifKeyboardResultsProps {
  results: GifResult[]
  isLoading: boolean;
}

defineProps<GifKeyboardResultsProps>()

const getUrl = (result: GifResult) => {
  return result.media_formats.gif?.url || ''
}
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
  aspect-ratio: 2 / 1.25;
  background-color: var(--grey-10);
  border-radius: 1rem;
  display: flex;
}

button {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  border: 0;
  cursor: pointer;
  position: relative;
  @include focus-outline;

  &::after {
    content: '';
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(white, .3);
    transition: var(--transition-default);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
    display: block;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
}
</style>