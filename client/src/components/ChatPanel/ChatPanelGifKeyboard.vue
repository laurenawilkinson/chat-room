<template>
  <div class="gif-keyboard-wrapper" ref="keyboardWrapper" @keydown.escape="showKeyboard = false">
    <IconButton label="GIF keyboard" @click.stop="showKeyboard = !showKeyboard">
      <IconGif />
    </IconButton>
    <Transition name="fade">
      <GifKeyboard v-if="showKeyboard" ref="keyboard" :searchTerm="searchTerm" :categories="categoriesData"
        :loadingCategories="categories.isFetching.value" :results="searchResultsData"
        :loadingResults="searchResults.isFetching.value || loadingSearchResults" @select:gif="onSelectGif"
        @select:category="onSelectCategory" @update:searchTerm="onUpdateSearchTerm" />
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside, useDebounceFn, useFetch } from '@vueuse/core'
import { computed, nextTick, ref, watch } from 'vue'
import { IconGif } from '@tabler/icons-vue'
import IconButton from '../UI/IconButton.vue'
import GifKeyboard from '../GifKeyboard/GifKeyboard.vue'
import type { TenorCategoriesResponse, TenorSearchResponse } from '@/types/tenor'
import { shuffle } from 'lodash'
import { getFirstFocusableElement } from '@/helpers/utils'

const emit = defineEmits(['select'])

// Show/Hide keyboard
const showKeyboard = ref(false)
const keyboardWrapper = ref(null)
const keyboard = ref<typeof GifKeyboard | null>(null)
onClickOutside(keyboardWrapper, () => {
  showKeyboard.value = false
})

// Data fetching
const searchTerm = ref('')
const searchPayload = computed(() => ({
  url: 'https://tenor.googleapis.com/v2/search',
  params: {
    q: searchTerm.value,
    locale: navigator.language,
    media_filter: 'gif'
  },
}))
const searchResults = useFetch('/api/tenor', { immediate: false })
  .post(searchPayload)
  .json<TenorSearchResponse>()
const searchResultsData = computed(() => searchResults.data.value?.results ?? [])
const categories = useFetch('/api/tenor')
  .post({
    url: 'https://tenor.googleapis.com/v2/categories',
    params: { locale: navigator.language }
  }).json<TenorCategoriesResponse>()
const categoriesData = computed(() => shuffle(categories.data.value?.tags ?? []))

const loadingSearchResults = ref(false)

const debouncedSearch = useDebounceFn(() => {
  if (searchTerm.value) {
    searchResults.execute()
  }
})

watch(searchTerm, (_, oldTerm) => {
  if (oldTerm.length === 0) {
    loadingSearchResults.value = true;
  }
})

searchResults.onFetchFinally(() => {
  loadingSearchResults.value = false;
})

watch(showKeyboard, async (show) => {
  if (show) {
    searchTerm.value = ''
    await nextTick()
    const focusableEl = getFirstFocusableElement(keyboard.value?.el);
    if (focusableEl) focusableEl.focus()
  }
})

const onSelectGif = (url: string) => {
  emit('select', url)
  showKeyboard.value = false
}

const onSelectCategory = (category: string) => {
  searchTerm.value = category;
  searchResults.execute()
}

const onUpdateSearchTerm = (value: string) => {
  searchTerm.value = value;
  debouncedSearch()
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/breakpoints';

.gif-keyboard-wrapper {
  position: relative;

  .gif-keyboard {
    $width: 380px;
    position: absolute;
    bottom: 100%;
    left: calc(#{$width} / 2 * -1);
    width: $width;
    height: 350px;

    @include max-breakpoint($mobile-bp) {
      left: unset;
      right: -100px;
    }

    @include max-breakpoint(sm) {
      width: 80vw;
    }
  }
}
</style>