"use client";

import React, { useEffect, useState } from "react";
import BlogList from "@/app/_components/blog/BlogList";
import { fetchPosts, fetchPostAuthor, createPost } from "@/app/_utils/api";
import { Post, Author } from "@/app/types/types";
import BlogForm from "@/app/_components/blog/BlogForm";
import Spinner from "@/app/_components/spinner/Spinner";

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedPosts: Post[] = await fetchPosts();
        const authors: Author[] = await Promise.all(
          fetchedPosts.map((post) => fetchPostAuthor(post.userId))
        );

        const postsWithAuthors = fetchedPosts.map((post) => {
          const author = authors.find((user) => user.id === post.userId);
          return {
            ...post,
            author: author ? author.name : "Unknown Author",
          };
        });

        setPosts(postsWithAuthors);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreatePost = async (data: {
    title: string;
    body: string;
    author: string;
  }) => {
    try {
      const newPost = await createPost(data);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-primary-500 mb-2 px-4 py-2 text-slate-200 rounded text-lg font-semibold hover:bg-primary-600 transition-all"
      >
        {showForm ? "Cancel" : "Create New Post"}
      </button>

      {showForm && (
        <BlogForm onSubmit={handleCreatePost} initialData={undefined} />
      )}

      {loading ? <Spinner /> : <BlogList posts={posts} />}
    </>
  );
};

export default BlogPage;
