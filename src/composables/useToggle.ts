import { ref } from 'vue';

export const useToggle = () => {
  const x = ref(false);

  const toggle = () => {
    x.value = !x.value;
  };

  const setValue = (value: boolean) => {
    x.value = value;
  };

  return { x, toggle, setValue };
};
