import './App.css';
import Header from './components/Header.tsx';
import PostList from './components/PostList.tsx';
import AuthPanel from './components/AuthPanel.tsx';
import StatusMessage from './components/StatusMessage.tsx';
import { useGetMeQuery, useGetPostsQuery } from './api/baseApi.ts';

export default function App() {
    const { data: posts, isLoading, isError, refetch } = useGetPostsQuery();
    const { data: me } = useGetMeQuery();

    let content;
    if (isLoading) {
        content = <StatusMessage type="loading" text="Загружаем объявления..." />;
    } else if (isError) {
        content = (
            <StatusMessage
                type="error"
                text="Не удалось загрузить объявления. Проверьте, что backend запущен."
                actionLabel="Повторить"
                onAction={refetch}
            />
        );
    } else if (!posts || posts.length === 0) {
        content = <StatusMessage type="empty" text="Пока нет ни одного объявления." />;
    } else {
        content = <PostList posts={posts} />;
    }

    return (
        <div className="app">
            <Header postsCount={posts?.length ?? 0} />
            <main className="layout">
                <section className="feed">
                    <h2 className="section-title">Лента объявлений</h2>
                    {content}
                </section>
                <aside className="sidebar">
                    {me ? (
                        <div className="auth-panel">
                            <h2 className="auth-title">Привет!</h2>
                            <p className="auth-hint">Вы вошли как <b>{me.email}</b></p>
                        </div>
                    ) : (
                        <AuthPanel />
                    )}
                </aside>
            </main>
        </div>
    );
}
