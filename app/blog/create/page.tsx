"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BlogForm from "@/app/_components/blog/BlogForm";
import { createPost } from "@/app/_utils/api";

const CreatePostPage: React.FC = () => {
  const router = useRouter();

  const handleCreate = async (data: {
    title: string;
    body: string;
    author: string;
  }) => {
    try {
      await createPost(data);
      router.push("/");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div>
      <h1>Create New Post</h1>
      <BlogForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreatePostPage;
