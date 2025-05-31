<template>
  <div :class="`status-indicator ${status}`" :title="showLabel ? '' : statusLabel">
    <figure :class="{ pulse: isPulsing }">
      <svg viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="5" />
      </svg>
    </figure>
    <span v-if="showLabel">{{ statusLabel }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import type { UserStatus } from '~/types/user';

interface StatusIndicatorProps {
  status: UserStatus;
  showLabel?: boolean
  pulseOn?: string | number | boolean;
}

const props = defineProps<StatusIndicatorProps>()

const statusLabels = {
  online: 'Online',
  away: 'Away',
  unknown: 'Offline'
}
const isPulsing = ref(false)

const statusLabel = computed(() => statusLabels[props.status] || 'Unknown')

watch(
  () => props.pulseOn,
  (value) => {
    if (value) {
      isPulsing.value = false;
      requestAnimationFrame(() => {
        isPulsing.value = true
      })
    }
  }
)
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
  }

  figure {
    position: relative;
    width: 10px;
    height: 10px;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      opacity: .5;
      background-color: var(--status-colour, var(--grey-40));
    }

    &.pulse {
      @keyframes pulse-grow {
        from {
          transform: scale(1);
          opacity: 0.5;
        }

        to {
          transform: scale(2.25);
          opacity: 0;
        }
      }

      &::after {
        animation: pulse-grow 1s ease-out;
      }
    }
  }
}
</style>