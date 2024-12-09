import { useState } from "react";

interface FormState {
  [key: string]: string;
}

export const useForm = (initialForm: FormState = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({ target }: { target: HTMLInputElement }) => {
    const { name, value } = target;
    setFormState((formState) => ({ ...formState, [name]: value }));
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return { onInputChange, onResetForm, formState };
};
