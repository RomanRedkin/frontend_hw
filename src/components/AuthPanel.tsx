import { useState } from 'react';
import RegisterForm from './RegisterForm.tsx';
import LoginForm from './LoginForm.tsx';

type AuthMode = 'login' | 'register';

export default function AuthPanel() {
    const [mode, setMode] = useState<AuthMode>('register');

    return (
        <div className="auth-panel">
            <div className="tabs">
                <button
                    type="button"
                    className={`tab ${mode === 'register' ? 'active' : ''}`}
                    onClick={() => setMode('register')}
                >
                    Регистрация
                </button>
                <button
                    type="button"
                    className={`tab ${mode === 'login' ? 'active' : ''}`}
                    onClick={() => setMode('login')}
                >
                    Вход
                </button>
            </div>

            <h2 className="auth-title">{mode === 'register' ? 'Создать аккаунт' : 'Войти в аккаунт'}</h2>

            {mode === 'register' ? (
                <RegisterForm onSuccess={() => setMode('login')} />
            ) : (
                <LoginForm />
            )}
        </div>
    );
}
