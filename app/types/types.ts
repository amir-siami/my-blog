export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  author: string;
  date?: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface OutlinedCardProps {
  post: Post;
}

export interface BlogListProps {
  posts: Post[];
}

export interface PostFormProps {
  initialData?: {
    title: string;
    body: string;
    author: string;
  };
  onSubmit: (data: { title: string; body: string; author: string }) => void;
  isEdit?: boolean;
}

export interface NavLinkProps {
  name: string;
  href: string;
  icon?: React.ReactNode;
  classes?: string;
}
