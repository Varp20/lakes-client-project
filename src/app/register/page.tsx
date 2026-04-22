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
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <h2 className="text-center text-3xl font-bold">Регистрация</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            required
          />
          {/* НОВОЕ ПОЛЕ: Ссылка на аватар */}
          <input
            type="text"
            placeholder="Ссылка на аватар (URL)"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            required
          />
          
          {error && <p className="text-red-500">{error}</p>}
          
          <button type="submit" className="w-full rounded-md bg-emerald-500 py-2 text-white font-bold hover:bg-emerald-600">
            Зарегистрироваться
          </button>
        </form>
        
        <p className="text-center">
          Уже есть аккаунт? <Link href="/login" className="text-emerald-500">Войти</Link>
        </p>
      </div>
    </div>
  );
}