<script lang="ts" setup>
  import type { TaskFilterType } from '@/types';

  const props = defineProps<{
    taskFilterType: TaskFilterType;
    currentFilterType: TaskFilterType;
  }>();

  const emit = defineEmits<{
    changeFilter: [TaskFilterType];
  }>();
</script>

<template>
  <button
    class="secondary"
    :class="{
      contrast: taskFilterType === props.currentFilterType,
    }"
    @click="emit('changeFilter', props.taskFilterType)"
  >
    {{ props.taskFilterType }}
  </button>
</template>

<style scoped>
  button {
    text-transform: uppercase;
  }
</style>
