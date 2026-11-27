import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Post } from '../data/Post.types';
import type { AuthFormData, AuthUser } from '../data/Auth.types';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        credentials: 'include',
    }),
    tagTypes: ['Post', 'Me'],
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => '/posts',
            providesTags: ['Post'],
        }),

        getMe: builder.query<AuthUser, void>({
            query: () => '/auth/me',
            providesTags: ['Me'],
        }),

        register: builder.mutation<AuthUser, AuthFormData>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body,
            }),
        }),

        login: builder.mutation<AuthUser, AuthFormData>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Me'],
        }),
    }),
});

export const { useGetPostsQuery, useGetMeQuery, useRegisterMutation, useLoginMutation } = baseApi;
