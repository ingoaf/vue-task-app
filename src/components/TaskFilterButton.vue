<script lang="ts" setup>
  import { useStore } from '@/composables/useStore';
  import type { TaskFilterType } from '@/types';

  const props = defineProps<{
    taskFilterType: TaskFilterType;
  }>();

  const store = useStore();
</script>

<template>
  <button
    class="secondary"
    :class="{
      contrast: taskFilterType === store.activeTaskFilter.value,
    }"
    @click="store.activeTaskFilter.value = taskFilterType"
  >
    {{ props.taskFilterType }}
  </button>
</template>

<style scoped>
  button {
    text-transform: uppercase;
  }
</style>
