import { Paper, Typography, Divider, CardActions } from "@mui/material";
import {
  fetchPostById,
  fetchPostAuthor,
  fetchPostComments,
  fetchPosts,
} from "@/app/_utils/api";
import { Post, Comment } from "@/app/types/types";
import CommentSection from "@/app/_components/comment/CommentSection";
import Link from "next/link";

async function getPost(id: number) {
  const post: Post = await fetchPostById(id);
  return post;
}

export async function generateStaticParams() {
  const posts: Post[] = await fetchPosts();

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { id: number } }) {
  const post = await getPost(params.id);

  return {
    title: post.title,
  };
}

export default async function Page({ params }: { params: { id: number } }) {
  const post = await getPost(params.id);

  const author = await fetchPostAuthor(post.userId);
  const comments: Comment[] = await fetchPostComments(post.id);

  return (
    <Paper elevation={3} style={{ padding: "16px", margin: "16px 0" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="body1">{post.body}</Typography>
      <Typography variant="body2">
        <strong>Author:</strong> {author.name}
      </Typography>
      <Typography variant="body2">
        <strong>Date of Publication:</strong> {new Date().toLocaleDateString()}
      </Typography>
      <CardActions>
        <Link href={`/blog/edit/${post.id}`}>Edit Post</Link>
      </CardActions>
      <Divider style={{ margin: "16px 0" }} />
      <CommentSection initialComments={comments} />
    </Paper>
  );
}
