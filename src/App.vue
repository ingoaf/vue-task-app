<script lang="ts" setup>
  import { ref, computed } from 'vue';

  import TaskForm from './components/TaskForm.vue';
  import TaskList from './components/TaskList.vue';
  import TaskFilterButton from './components/TaskFilterButton.vue';
  import { useStore } from './composables/useStore';

  const store = useStore();

  const message = ref('Tasks App');
  const numberOfCompletedTasks = computed(() => store.tasks.filter((t) => t.done).length);

  const onTaskAdd = (taskName: string) => {
    const length = store.tasks.length.toString();
    store.tasks.push({
      id: length,
      title: taskName,
      done: false,
    });
  };

  const onChangeTaskStatus = (id: string) => {
    const changedTaskindex = store.tasks.findIndex((t) => t.id === id);
    if (changedTaskindex === -1) {
      return;
    }
    store.tasks[changedTaskindex].done = !store.tasks[changedTaskindex].done;
  };

  const onDeleteTask = (id: string) => {
    const changedTaskIndex = store.tasks.findIndex((t) => t.id === id);
    if (changedTaskIndex === -1) {
      return;
    }
    store.tasks.splice(changedTaskIndex, 1);
  };
</script>

<template>
  <main>
    <h1>{{ message }}</h1>
    <TaskForm @add-task="onTaskAdd" />
    <!-- shorthand for :tasks=tasks -->
    <h3 v-if="!store.tasks.length">Add a task to get started</h3>
    <h3 v-else>{{ `${numberOfCompletedTasks}/${store.tasks.length} completed` }}</h3>
    <div class="button-container filter-buttons">
      <TaskFilterButton
        :current-filter-type="store.activeTaskFilter.value"
        task-filter-type="All"
        @change-filter="store.activeTaskFilter.value = 'All'"
      />
      <TaskFilterButton
        :current-filter-type="store.activeTaskFilter.value"
        task-filter-type="Done"
        @change-filter="store.activeTaskFilter.value = 'Done'"
      />
      <TaskFilterButton
        :current-filter-type="store.activeTaskFilter.value"
        task-filter-type="Todo"
        @change-filter="store.activeTaskFilter.value = 'Todo'"
      />
    </div>
    <TaskList @change-task-status="onChangeTaskStatus" @delete-task="onDeleteTask" />
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
