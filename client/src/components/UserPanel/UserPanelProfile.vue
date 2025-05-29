<template>
  <div class="user-panel-profile" :style="{ '--user-colour': userColours[activeUser.colour] }">
    <ProfileImage :image="activeUser.image" />
    <div>
      <strong>{{ activeUser.username }}</strong>
      <StatusIndicator :status="activeUser.status" showLabel />
    </div>
    <IconButton @click="$emit('click:settings')">
      <IconSettings />
    </IconButton>
  </div>
</template>

<script lang="ts" setup>
import StatusIndicator from '@/components/StatusIndicator.vue'
import { IconSettings } from '@tabler/icons-vue'
import IconButton from '../UI/IconButton.vue';
import ProfileImage from '../UI/ProfileImage.vue';
import type { UserProfile } from '~/types/user';
import { userColours } from '~/helpers/user';

interface UserPanelProfileProps {
  activeUser: UserProfile
}

defineProps<UserPanelProfileProps>()
defineEmits(['click:settings'])
</script>

<style lang="scss" scoped>
.user-panel-profile {
  display: flex;
  align-items: center;
  gap: 1rem;

  figure {
    flex-shrink: 0;
  }

  > div {
    flex: 1;
    min-width: 0;
  }
}

strong {
  display: block;
  margin-bottom: 0.25rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  color: var(--user-colour);
}
</style>
