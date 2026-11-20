import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '../api/baseApi';
import { getErrorMessage } from '../api/getErrorMessage';
import type { RegisterFormData } from '../data/Auth.types';

interface RegisterFormProps {
    onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
    const [registerUser, { isLoading }] = useRegisterMutation();
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm<RegisterFormData>({
        defaultValues: { email: '', password: '', confirmPassword: '' },
    });

    const onSubmit = async (formData: RegisterFormData) => {
        const result = await registerUser({ email: formData.email, password: formData.password });

        if (result.data) {
            alert(`Регистрация успешна! Добро пожаловать, ${result.data.email} (id: ${result.data.id})`);
            reset();
            onSuccess?.();
        } else {
            alert(`Ошибка регистрации: ${getErrorMessage(result.error)}`);
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
                    placeholder="Минимум 6 символов"
                    autoComplete="new-password"
                    className={errors.password ? 'invalid' : ''}
                    {...register('password', {
                        required: 'Введите пароль',
                        minLength: { value: 6, message: 'Минимум 6 символов' },
                    })}
                />
                {errors.password && <small className="field-error">{errors.password.message}</small>}
            </label>

            <label className="field">
                <span>Повторите пароль</span>
                <input
                    type="password"
                    placeholder="Ещё раз пароль"
                    autoComplete="new-password"
                    className={errors.confirmPassword ? 'invalid' : ''}
                    {...register('confirmPassword', {
                        required: 'Повторите пароль',
                        validate: (value) => value === getValues('password') || 'Пароли не совпадают',
                    })}
                />
                {errors.confirmPassword && (
                    <small className="field-error">{errors.confirmPassword.message}</small>
                )}
            </label>

            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Регистрируем...' : 'Зарегистрироваться'}
            </button>
        </form>
    );
}
