<template>
  <div :class="`status-indicator ${status}`" :title="showLabel ? '' : statusLabel">
    <svg viewBox="0 0 10 10">
      <circle cx="5" cy="5" r="5" />
    </svg>
    <span v-if="showLabel">{{ statusLabel }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { UserStatus } from '~/types/user';

interface StatusIndicatorProps {
  status: UserStatus;
  showLabel?: boolean
}

const props = defineProps<StatusIndicatorProps>()

const statusLabels = {
  online: 'Online',
  away: 'Away',
  unknown: 'Offline'
}

const statusLabel = computed(() => statusLabels[props.status] || 'Unknown')
</script>

<style lang="scss" scoped>
.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: var(--12px);
  color: var(--grey-70);

  &.online {
    --status-colour: var(--green);
  }

  &.away {
    --status-colour: var(--yellow);
  }

  svg {
    fill: var(--status-colour, var(--grey-40));
    width: 10px;
    height: 10px;
  }
}
</style>
