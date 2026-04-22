'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(''); // Добавлено для авы
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Добавили avatarUrl пятым аргументом
      await api.register(login, email, password, 'CLIENT', avatarUrl);
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
    }
  };

  return (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
    <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg">
      <h2 className="text-center text-3xl font-bold text-gray-800">Регистрация</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Логин</label>
          <input
            type="text"
            placeholder="Ваш никнейм"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Ссылка на аватар (URL)</label>
          <input
            type="text"
            placeholder="https://image.com/photo.jpg"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Пароль</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-md bg-emerald-500 py-2.5 font-semibold text-white transition-colors hover:bg-emerald-600 active:bg-emerald-700"
        >
          Зарегистрироваться
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Уже есть аккаунт?{' '}
        <Link href="/login" className="font-medium text-emerald-600 hover:underline">
          Войти
        </Link>
      </p>
    </div>
  </div>
);
}