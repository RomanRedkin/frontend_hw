import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../api/baseApi';
import { getErrorMessage } from '../api/getErrorMessage';
import type { AuthUser, LoginFormData } from '../data/Auth.types';

interface LoginFormProps {
    onSuccess?: (user: AuthUser) => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
    const [login, { isLoading }] = useLoginMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormData>({
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (formData: LoginFormData) => {
        const result = await login(formData);

        if (result.data) {
            alert(`Вы вошли как ${result.data.email}`);
            reset();
            onSuccess?.(result.data);
        } else {
            alert(`Ошибка входа: ${getErrorMessage(result.error)}`);
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <label className="field">
                <span>Email</span>
                <input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={errors.email ? 'invalid' : ''}
                    {...register('email', {
                        required: 'Введите email',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Некорректный email' },
                    })}
                />
                {errors.email && <small className="field-error">{errors.email.message}</small>}
            </label>

            <label className="field">
                <span>Пароль</span>
                <input
                    type="password"
                    placeholder="Ваш пароль"
                    autoComplete="current-password"
                    className={errors.password ? 'invalid' : ''}
                    {...register('password', { required: 'Введите пароль' })}
                />
                {errors.password && <small className="field-error">{errors.password.message}</small>}
            </label>

            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Входим...' : 'Войти'}
            </button>
        </form>
    );
}
