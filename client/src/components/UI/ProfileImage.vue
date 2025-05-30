<template>
  <figure :style="{ '--user-colour': colour ? userColours[colour] : '' }">
    <img v-if="image" :src="imageUrl" alt="" />
  </figure>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { userColours } from '~/helpers/user';
import type { UserColour, UserImage } from '~/types/user';

interface ProfileImageProps {
  image: UserImage;
  colour?: UserColour;
}

const props = defineProps<ProfileImageProps>()

const imageUrl = computed(() => `/images/profile/${props.image}.png`)
</script>

<style lang="scss" scoped>
figure {
  border-radius: var(--profile-image-size, 2.5rem);
  width: var(--profile-image-size, 2.5rem);
  height: var(--profile-image-size, 2.5rem);
  padding: .45rem;
  border: 2px solid var(--user-colour, #eee);
  position: relative;
  transition: .2s ease-out;
  aspect-ratio: 1;
  user-select: none;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: var(--user-colour, #eee);
    opacity: .1;
    transition: .2s ease-out;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
}
</style>