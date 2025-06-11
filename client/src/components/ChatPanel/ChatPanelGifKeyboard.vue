<template>
  <div class="gif-keyboard-wrapper" ref="keyboard">
    <IconButton @click.stop="showKeyboard = !showKeyboard">
      <IconGif />
    </IconButton>
    <Transition name="fade">
      <GifKeyboard v-if="showKeyboard" v-model:searchTerm="searchTerm" :categories="categoriesData"
        :loadingCategories="categories.isFetching.value" :results="searchResultsData"
        :loadingResults="searchResults.isFetching.value" @select:gif="onSelectGif"
        @select:category="onSelectCategory" />
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside, useFetch } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { IconGif } from '@tabler/icons-vue'
import IconButton from '../UI/IconButton.vue'
import GifKeyboard from '../GifKeyboard/GifKeyboard.vue'
import type { TenorCategoriesResponse, TenorSearchResponse } from '@/types/tenor'

const emit = defineEmits(['select'])

// Show/Hide keyboard
const showKeyboard = ref(false)
const keyboard = ref(null)
onClickOutside(keyboard, () => {
  showKeyboard.value = false
})

// Data fetching
const searchTerm = ref('')
const searchPayload = computed(() => ({
  url: 'https://tenor.googleapis.com/v2/search',
  params: {
    q: searchTerm.value,
    locale: navigator.language,
    media_filter: 'gif,tinygif'
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
const categoriesData = computed(() => categories.data.value?.tags ?? [])

watch(searchTerm, (value) => {
  if (value) {
    searchResults.execute()
  }
})

watch(showKeyboard, (show) => {
  if (show) {
    searchTerm.value = ''
  }
})

const onSelectGif = (url: string) => {
  emit('select', url)
  showKeyboard.value = false
}

const onSelectCategory = (category: string) => {
  searchTerm.value = category;
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