'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { authStorage } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(''); // Новое поле
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Добавляем avatarUrl в запрос
      const result = await api.register(login, email, password, 'CLIENT', avatarUrl);
      authStorage.setAccessToken(result.tokens.accessToken);
      authStorage.setRefreshToken(result.tokens.refreshToken);
      authStorage.setUser(result.user);
      router.replace('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Не удалось создать аккаунт');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card stack">
        <div>
          <div className="eyebrow">Новый клиент</div>
          <h1 className="auth-title">Регистрация</h1>
          <p className="muted">Регистрация отправляет роль CLIENT и ссылку на аватар.</p>
        </div>

        <form className="stack" onSubmit={handleSubmit}>
          <label className="field">
            <span>Логин</span>
            <input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Введите логин" required />
          </label>

          <label className="field">
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите email" required />
          </label>

          {/* Добавленное поле для аватара */}
          <label className="field">
            <span>Ссылка на аватар (URL)</span>
            <input type="text" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://example.com/photo.jpg" />
          </label>

          <label className="field">
            <span>Пароль</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Введите пароль" required />
          </label>

          <label className="field">
            <span>Повторите пароль</span>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Повторите пароль" required />
          </label>

          {error ? <div className="error-box">{error}</div> : null}

          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Создание...' : 'Создать аккаунт'}
          </button>
        </form>

        <p className="muted small-text">
          Уже есть аккаунт? <Link href="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}