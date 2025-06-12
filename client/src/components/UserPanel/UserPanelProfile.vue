<template>
  <div class="user-panel-profile" :style="{ '--user-colour': userColours[activeUser.colour] }">
    <ProfileImage :image="activeUser.image" @click="$emit('click:settings')" />
    <div>
      <strong>{{ activeUser.username }}</strong>
      <ContextMenu>
        <template #toggle="{ toggleMenu }">
          <Button theme="grey" variant="ghost" size="xs" @click="toggleMenu">
            <StatusIndicator :status="activeUser.status" showLabel />
          </Button>
        </template>
        <template #default="{ closeMenu }">
          <ContextMenuItem @select="sendStatus('online', closeMenu)">
            <StatusIndicator status="online" showLabel />
          </ContextMenuItem>
          <ContextMenuItem @select="sendStatus('away', closeMenu)">
            <StatusIndicator status="away" showLabel />
          </ContextMenuItem>
        </template>
      </ContextMenu>
    </div>
    <IconButton label="User settings" @click="$emit('click:settings')">
      <IconSettings />
    </IconButton>
  </div>
</template>

<script lang="ts" setup>
import StatusIndicator from '@/components/StatusIndicator.vue'
import { IconSettings } from '@tabler/icons-vue'
import IconButton from '../UI/IconButton.vue';
import ProfileImage from '../UI/ProfileImage.vue';
import type User from '@/models/User';
import { userColours } from '~/helpers/user';
import ContextMenu from '../ContextMenu/ContextMenu.vue';
import ContextMenuItem from '../ContextMenu/ContextMenuItem.vue';
import Button from '../UI/Button.vue';
import type { UserStatus } from '~/types/user';

interface UserPanelProfileProps {
  activeUser: User
}

defineProps<UserPanelProfileProps>()
const emit = defineEmits(['click:settings', 'send:status'])

const sendStatus = (status: UserStatus, closeMenu: () => void) => {
  emit('send:status', status)
  closeMenu()
}
</script>

<style lang="scss" scoped>
.user-panel-profile {
  display: flex;
  align-items: center;
  gap: 1rem;

  figure {
    flex-shrink: 0;
    cursor: pointer;
  }

  > div {
    flex: 1;
    min-width: 0;
  }
}

.context-menu {
  margin-left: -.5rem;
}

.context-menu-items .status-indicator {
  font-size: var(--14px);
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
