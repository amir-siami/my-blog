import { Post, Author, Comment } from "@/app/types/types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return await response.json();
};

export const fetchPostById = async (postId: number): Promise<Post> => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch post with ID ${postId}: ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch post");
  }
};

export const fetchPostAuthor = async (userId: number): Promise<Author> => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch author");
  }
  const user = await response.json();
  return { id: user.id, name: user.name };
};

export const fetchPostComments = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }
  return await response.json();
};

export const createPost = async (data: {
  title: string;
  body: string;
  author: string;
}) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: data.title,
      body: data.body,
      author: data.author,
      userId: 1, // Hardcoded userId to 1
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }
  return await response.json();
};

export const updatePost = async (
  id: number,
  data: { title: string; body: string; author: string }
) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update post");
  return await response.json();
};
