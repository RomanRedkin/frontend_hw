import type { Post } from './data/Post.types';

export default function PostCard({ post }: { post: Post }) {
    return (
        <div className="post-card">
            <span className="category">{post.category}</span>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div className="author">Автор: {post.author}</div>
        </div>
    );
}