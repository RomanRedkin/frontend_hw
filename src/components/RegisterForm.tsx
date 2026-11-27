import { useForm } from 'react-hook-form';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useRegisterMutation } from '../api/baseApi';
import type { RegisterFormData } from '../data/Auth.types';

interface RegisterFormProps {
    onSuccess: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
    const [registerUser, { isLoading }] = useRegisterMutation();
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<RegisterFormData>({
        mode: 'onChange',
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (formData: RegisterFormData) => {
        try {
            const user = await registerUser(formData).unwrap();
            alert(`Регистрация успешна! Теперь войдите как ${user.email}`);
            reset();
            onSuccess();
        } catch (error) {
            const status = (error as FetchBaseQueryError).status;
            if (status === 409) {
                setError('root', { message: 'Этот email уже занят' });
            } else if (status === 'FETCH_ERROR') {
                setError('root', { message: 'Нет связи с сервером. Попробуйте ещё раз' });
            } else {
                setError('root', { message: 'Что-то пошло не так. Попробуйте позже' });
            }
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <label className="field">
                <span>Email</span>
                <input
                    type="email"
                    placeholder="you@example.com"
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
                    className={errors.password ? 'invalid' : ''}
                    {...register('password', {
                        required: 'Введите пароль',
                        minLength: { value: 6, message: 'Минимум 6 символов' },
                    })}
                />
                {errors.password && <small className="field-error">{errors.password.message}</small>}
            </label>

            {errors.root && <p className="form-error">{errors.root.message}</p>}

            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Регистрируем...' : 'Зарегистрироваться'}
            </button>
        </form>
    );
}
