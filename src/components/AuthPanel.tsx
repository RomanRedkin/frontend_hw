import { useState } from 'react';
import RegisterForm from './RegisterForm.tsx';
import LoginForm from './LoginForm.tsx';
import type { AuthUser } from '../data/Auth.types';

type AuthMode = 'login' | 'register';

export default function AuthPanel() {
    const [mode, setMode] = useState<AuthMode>('register');
    const [user, setUser] = useState<AuthUser | null>(null);

    if (user) {
        return (
            <div className="auth-panel">
                <h2 className="auth-title">Привет!</h2>
                <p className="auth-hint">Вы вошли как <b>{user.email}</b></p>
                <button type="button" className="btn btn-secondary" onClick={() => setUser(null)}>
                    Сменить аккаунт
                </button>
            </div>
        );
    }

    return (
        <div className="auth-panel">
            <div className="tabs" role="tablist">
                <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'register'}
                    className={`tab ${mode === 'register' ? 'active' : ''}`}
                    onClick={() => setMode('register')}
                >
                    Регистрация
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'login'}
                    className={`tab ${mode === 'login' ? 'active' : ''}`}
                    onClick={() => setMode('login')}
                >
                    Вход
                </button>
            </div>

            <h2 className="auth-title">{mode === 'register' ? 'Создать аккаунт' : 'Войти в аккаунт'}</h2>
            <p className="auth-hint">
                {mode === 'register'
                    ? 'Зарегистрируйтесь, чтобы публиковать объявления.'
                    : 'Введите email и пароль, указанные при регистрации.'}
            </p>

            {mode === 'register' ? (
                <RegisterForm onSuccess={() => setMode('login')} />
            ) : (
                <LoginForm onSuccess={setUser} />
            )}
        </div>
    );
}
