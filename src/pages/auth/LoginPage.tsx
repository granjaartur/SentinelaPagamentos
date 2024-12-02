import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lock } from 'lucide-react';
import LoginForm from '../../components/auth/LoginForm';
import { api } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import type { LoginCredentials, AuthResponse } from '../../types/auth';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (credentials: LoginCredentials) => {
    const response = await api.post<AuthResponse>('/api/auth/login', credentials);
    login(response.token, response.user);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Lock className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t('auth.signIn')}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm onSubmit={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;