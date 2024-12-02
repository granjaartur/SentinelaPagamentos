import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { loginSchema } from '../../utils/form-validators/auth.validator';
import type { LoginCredentials } from '../../types/auth';
import FormInput from '../forms/FormInput';

interface LoginFormProps {
  onSubmit: (data: LoginCredentials) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const handleFormSubmit = async (data: LoginCredentials) => {
    try {
      await onSubmit(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('auth.loginError'));
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <FormInput
        label={t('auth.email')}
        name="email"
        type="email"
        register={register}
        error={errors.email?.message}
      />

      <FormInput
        label={t('auth.password')}
        name="password"
        type="password"
        register={register}
        error={errors.password?.message}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isSubmitting ? t('common.loading') : t('auth.login')}
      </button>
    </form>
  );
};

export default LoginForm;