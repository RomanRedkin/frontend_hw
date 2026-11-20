import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import type { ApiError } from '../data/Auth.types';

export function getErrorMessage(error: FetchBaseQueryError | SerializedError | undefined): string {
    if (!error) return 'Неизвестная ошибка';

    if ('status' in error) {
        if (error.status === 'FETCH_ERROR') return 'Сервер недоступен. Проверьте, что backend запущен.';
        const data = error.data as ApiError | undefined;
        if (data && typeof data.message === 'string') return data.message;
        return `Ошибка запроса (${error.status})`;
    }

    return error.message ?? 'Неизвестная ошибка';
}
