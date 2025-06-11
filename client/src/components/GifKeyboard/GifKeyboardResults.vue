<template>
  <ul v-if="isLoading">
    <li v-for="(_, index) in Array(6)" :key="index"></li>
  </ul>
  <ul v-else>
    <li v-for="result in results" :key="result.id">
      <button @click="$emit('select', getUrl(result))">
        <img :src="getUrl(result)" :alt="result.content_description" />
      </button>
    </li>
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
  if (result.media_formats.tinygif) {
    return result.media_formats.tinygif.url;
  }
  if (result.media_formats.gif) {
    return result.media_formats.gif.url;
  }
  return ''
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/ui';

ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .5rem;
  overflow-y: auto;
  height: 100%;
  padding: 1rem;
  @include rounded-scrollbar;

  &:has(li:empty) {
    overflow: hidden;
  }
}

li {
  width: 100%;
  aspect-ratio: 2 / 1.25;
  background-color: var(--grey-10);
  border-radius: 1rem;
}

button {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  border: 0;
  cursor: pointer;
  position: relative;
  @include button-focus;

  &::after {
    content: '';
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(white, .3);
    transition: .2s ease-out;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
}
</style>