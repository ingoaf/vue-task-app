import { type Ref, reactive, ref } from 'vue';

import type { Task, TaskFilterType, Store } from '@/types';

const tasks = reactive<Task[]>([]);
const activeTaskFilter: Ref<TaskFilterType> = ref('All');

export const useStore = (): Store => {
  return {
    tasks,
    activeTaskFilter,
  };
};
