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

interface StatusIndicatorProps {
  status: 'online' | 'away'
  showLabel?: boolean
}

const props = defineProps<StatusIndicatorProps>()

const statusLabels = {
  online: 'Online',
  away: 'Away'
}

const statusLabel = computed(() => statusLabels[props.status] || 'Unknown')
</script>

<style lang="scss" scoped>
.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: var(--12px);
  color: #5a5a5a;

  &.online {
    --status-colour: var(--green);
  }

  &.away {
    --status-colour: var(--yellow);
  }

  svg {
    fill: var(--status-colour, #bfbfbf);
    width: 10px;
    height: 10px;
  }
}
</style>
