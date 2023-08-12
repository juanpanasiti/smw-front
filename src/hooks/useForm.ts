import { useState } from 'react';

export const useForm = <T extends object>(initialState: T) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = (value: unknown, field: keyof T) => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  // return [ values, handleInputChange, reset ];
  return {
    values,
    handleInputChange,
    reset,
  };
  
};