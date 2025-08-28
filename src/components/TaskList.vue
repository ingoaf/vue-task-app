<script lang="ts" setup>
  import type { Task } from '@/types';
  const props = defineProps<{ tasks: Task[] }>();

  const emit = defineEmits<{
    changeTaskStatus: [id: string];
    deleteTask: [id: string];
  }>();
</script>

<template>
  <!-- TransitionGroup is a Vue element to use list (v-for) animations -->
  <!-- The tag determines in which element the list elements will be wrapped for animations -->
  <!-- The name determines which prefix the css classes for the animation will have   -->
  <TransitionGroup tag="div" name="task-list" class="task-list">
    <article v-for="task in props.tasks" :key="task.id" class="task">
      <label>
        <input
          type="checkbox"
          :checked="task.done"
          @input="() => emit('changeTaskStatus', task.id)"
        />
        <span
          :class="{
            'task-done': task.done,
          }"
          >{{ task.title }}</span
        >
      </label>
      <button class="outline" style="color: red" @click="emit('deleteTask', task.id)">
        Delete
      </button>
    </article>
  </TransitionGroup>
</template>

<style scoped>
  .task-list {
    margin-top: 1rem;
  }

  .task-done {
    text-decoration: line-through;
  }

  .task {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .task-list-enter-active,
  .task-list-leave-active {
    transition: all 0.5s ease;
  }

  .task-list-enter-from,
  .task-list-leave-to {
    opacity: 0;
    transform: translateX(300px);
  }

  .task-list-enter-to,
  .task-list-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
</style>
