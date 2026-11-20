export interface Author {
    id: number;
    email: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    author: Author | null;
    category: Category | null;
}
