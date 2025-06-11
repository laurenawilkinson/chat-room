<template>
  <div class="gif-keyboard" ref="keyboard">
    <div class="gif-keyboard-search">
      <IconButton v-if="searchTerm.length > 0" @click="clearSearch">
        <IconArrowLeft />
      </IconButton>
      <div class="gif-keyboard-search-input">
        <input v-model="searchTerm" class="sm" placeholder="Search GIFs" />
        <aside>
          <IconSearch v-if="searchTerm.length === 0" />
          <IconButton v-else @click="clearSearch">
            <IconCircleDashedX />
          </IconButton>
        </aside>
      </div>
    </div>
    <div class="gif-keyboard-content">
      <GifKeyboardCategories v-if="searchTerm.length === 0" :categories="categories" :isLoading="loadingCategories"
        @select="onSelectCategory" />
      <GifKeyboardResults v-else :results="results" :isLoading="loadingResults" @select="onSelectGif" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GifCategory, GifResult } from '@/types/tenor';
import GifKeyboardCategories from './GifKeyboardCategories.vue';
import GifKeyboardResults from './GifKeyboardResults.vue';
import IconButton from '../UI/IconButton.vue';
import { IconArrowLeft, IconCircleDashedX, IconSearch } from '@tabler/icons-vue';
import { useVModel } from '@vueuse/core';

interface GifKeyboardProps {
  searchTerm: string;
  categories: GifCategory[]
  loadingCategories: boolean
  results: GifResult[]
  loadingResults: boolean
}

const props = defineProps<GifKeyboardProps>()
const emit = defineEmits(['update:searchTerm', 'select:gif', 'select:category'])
const searchTerm = useVModel(props, 'searchTerm', emit)

const clearSearch = () => {
  searchTerm.value = ''
}

const onSelectCategory = (searchTerm: string) => {
  emit('select:category', searchTerm)
}

const onSelectGif = (url: string) => {
  emit('select:gif', url)
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/ui';

.gif-keyboard {
  background-color: white;
  border: 2px solid var(--grey-20);
  box-shadow: 0 3px 6px #849eb025;
  border-radius: .75rem;
  display: flex;
  flex-direction: column;
}

.gif-keyboard-content {
  flex: 1;
  overflow: hidden auto;
  padding: 1rem;
  width: 100%;
  scrollbar-gutter: stable;
  @include rounded-scrollbar;

  &:has(li:empty) {
    overflow: hidden;
  }
}

.gif-keyboard-search {
  display: flex;
  align-items: center;
  padding: 1rem 1rem .5rem;
  gap: .5rem;

  &-input {
    position: relative;
    flex: 1;
  }

  input {
    padding-right: 2.5rem;
  }

  aside {
    position: absolute;
    top: 0;
    bottom: 0;
    right: .5rem;
    margin: auto;
    display: flex;
    align-items: center;

    svg {
      width: 1.5rem;
      height: 1.5rem;
      stroke: var(--grey-40);
    }
  }
}
</style>