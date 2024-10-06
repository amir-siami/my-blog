"use client";

import React, { useEffect, useState } from "react";
import BlogList from "@/app/_components/blog/BlogList";
import { fetchPosts, fetchPostAuthor, createPost } from "@/app/_utils/api";
import { Post, Author } from "@/app/types/types";
import BlogForm from "@/app/_components/blog/BlogForm";
import Spinner from "@/app/_components/spinner/Spinner"; // Assuming you have a Spinner component

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // For tracking loading state
  const [showForm, setShowForm] = useState<boolean>(false); // To toggle form visibility

  // Fetch posts on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
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
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  // Function to handle the creation of a new post
  const handleCreatePost = async (data: {
    title: string;
    body: string;
    author: string;
  }) => {
    try {
      const newPost = await createPost(data);
      setPosts((prevPosts) => [newPost, ...prevPosts]); // Add the new post to the list
      setShowForm(false); // Hide the form after successful post creation
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-primary-500 px-4 py-2 text-slate-200 rounded text-lg font-semibold hover:bg-primary-600 transition-all"
      >
        {showForm ? "Cancel" : "Create New Post"}
      </button>

      {showForm && <BlogForm onSubmit={handleCreatePost} />}

      {loading ? (
        <Spinner /> // Show spinner while loading
      ) : (
        <BlogList posts={posts} /> // Show posts after loading completes
      )}
    </div>
  );
};

export default BlogPage;
