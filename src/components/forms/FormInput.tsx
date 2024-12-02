import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: string;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  register,
  error,
  className = '',
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormInput;