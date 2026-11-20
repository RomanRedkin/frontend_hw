import type { Post } from '../data/Post.types';

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className="post-card">
            <span className="category">{post.category?.name ?? 'Без категории'}</span>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-content">{post.content}</p>
            <div className="author">Автор: {post.author?.email ?? 'Аноним'}</div>
        </article>
    );
}
