import type { Ref } from 'vue';

export type Task = {
  id: string;
  title: string;
  done: boolean;
};

export type TaskFilterType = 'Done' | 'Todo' | 'All';

export type Store = {
  tasks: Task[];
  activeTaskFilter: Ref<TaskFilterType>;
};
