import { listPosts } from './data/Post.ts';
import PostCard from './Post.tsx';

export default function PostList() {
    return (
        <div className="post-list">
            {listPosts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}