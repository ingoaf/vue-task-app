export type Task = {
  id: string;
  title: string;
  done: boolean;
};

export type TaskFilterType = 'Done' | 'Todo' | 'All';
