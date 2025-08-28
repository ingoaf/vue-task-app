<script lang="ts" setup>
  import { ref, computed } from 'vue';

  import TaskForm from './components/TaskForm.vue';
  import type { TaskFilterType, Task } from './types';
  import TaskList from './components/TaskList.vue';
  import TaskFilterButton from './components/TaskFilterButton.vue';

  const message = ref('Tasks App');
  const tasks = ref<Task[]>([]);
  const activeTaskFilter = ref<TaskFilterType>('All');
  const displayedTasks = computed(() => {
    switch (activeTaskFilter.value) {
      case 'Done':
        return tasks.value.filter((t) => t.done);
      case 'Todo':
        return tasks.value.filter((t) => !t.done);
      default:
        return tasks.value;
    }
  });
  const numberOfCompletedTasks = computed(() => tasks.value.filter((t) => t.done).length);

  const onTaskAdd = (taskName: string) => {
    const length = tasks.value.length.toString();
    tasks.value.push({
      id: length,
      title: taskName,
      done: false,
    });
  };

  const onChangeTaskStatus = (id: string) => {
    const changedTaskindex = tasks.value.findIndex((t) => t.id === id);
    if (changedTaskindex === -1) {
      return;
    }
    tasks.value[changedTaskindex].done = !tasks.value[changedTaskindex].done;
  };

  const onDeleteTask = (id: string) => {
    const changedTaskIndex = tasks.value.findIndex((t) => t.id === id);
    if (changedTaskIndex === -1) {
      return;
    }
    tasks.value.splice(changedTaskIndex, 1);
  };
</script>

<template>
  <main>
    <h1>{{ message }}</h1>
    <TaskForm @add-task="onTaskAdd" />
    <!-- shorthand for :tasks=tasks -->
    <h3 v-if="!tasks.length">Add a task to get started</h3>
    <h3 v-else>{{ `${numberOfCompletedTasks}/${tasks.length} completed` }}</h3>
    <div class="button-container filter-buttons">
      <TaskFilterButton
        :current-filter-type="activeTaskFilter"
        task-filter-type="All"
        @change-filter="activeTaskFilter = 'All'"
      />
      <TaskFilterButton
        :current-filter-type="activeTaskFilter"
        task-filter-type="Done"
        @change-filter="activeTaskFilter = 'Done'"
      />
      <TaskFilterButton
        :current-filter-type="activeTaskFilter"
        task-filter-type="Todo"
        @change-filter="activeTaskFilter = 'Todo'"
      />
    </div>
    <TaskList
      :tasks="displayedTasks"
      @change-task-status="onChangeTaskStatus"
      @delete-task="onDeleteTask"
    />
  </main>
</template>

<style scoped>
  main {
    max-width: 800px;
    margin: 1rem auto;
  }
  .filter-buttons {
    display: flex;
    justify-content: end;
    gap: 1rem;
  }
</style>
