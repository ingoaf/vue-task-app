<script lang="ts" setup>
  import { ref } from 'vue';

  const emit = defineEmits<{
    addTask: [newTask: string];
  }>();
  const error = ref('');

  const newTaskName = ref('');

  const onTaskSubmit = () => {
    error.value = '';
    if (!newTaskName.value.trim()) {
      error.value = 'A task name may not be empty';
      return;
    }
    emit('addTask', newTaskName.value.trim());
    newTaskName.value = '';
  };
</script>

<template>
  <!-- to listen to an event we use '@' or 'v-on' -->
  <form @submit.prevent="onTaskSubmit">
    <label> New Task </label>
    <input
      v-model="newTaskName"
      name="newTaskName"
      :aria-invalid="!!error || undefined"
      @input="() => (error = '')"
    />
    <small v-if="error" id="invalid-helper"> {{ error }} </small>
    <div class="button-container">
      <button>Add</button>
    </div>
  </form>
</template>

<style scoped lang="css">
  .button-container {
    display: flex;
    justify-content: end;
  }

  #invalid-helper {
    color: red;
  }
</style>
