<template>
  <div class="gif-keyboard" ref="keyboard">
    <GifKeyboardCategories v-if="searchTerm.length === 0" :categories="categories" :isLoading="loadingCategories"
      @select="onSelectCategory" />
    <GifKeyboardResults v-else :results="results" :isLoading="loadingResults" @select="onSelectGif" />
  </div>
</template>

<script lang="ts" setup>
import type { GifCategory, GifResult } from '@/types/tenor';
import GifKeyboardCategories from './GifKeyboardCategories.vue';
import GifKeyboardResults from './GifKeyboardResults.vue';

interface GifKeyboardProps {
  searchTerm: string;
  categories: GifCategory[]
  loadingCategories: boolean
  results: GifResult[]
  loadingResults: boolean
}

defineProps<GifKeyboardProps>()
const emit = defineEmits(['update:searchTerm', 'select:gif', 'select:category'])

const onSelectCategory = (searchTerm: string) => {
  emit('select:category', searchTerm)
}

const onSelectGif = (url: string) => {
  emit('select:gif', url)
}
</script>

<style lang="scss" scoped>
.gif-keyboard {
  background-color: white;
  border: 2px solid var(--grey-20);
  box-shadow: 0 3px 6px #849eb025;
  border-radius: .75rem;
}
</style>