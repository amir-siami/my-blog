"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import BlogForm from "@/app/_components/blog/BlogForm";
import { updatePost, fetchPostById } from "@/app/_utils/api";

const EditPostPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const [initialData, setInitialData] = useState<{
    title: string;
    body: string;
    author: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostData = async () => {
      if (id) {
        try {
          const post = await fetchPostById(Number(id));
          setInitialData({
            title: post.title,
            body: post.body,
            author: post.author,
          });
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch post:", error);
          setLoading(false);
        }
      }
    };
    fetchPostData();
  }, [id]);

  const handleUpdate = async (data: {
    title: string;
    body: string;
    author: string;
  }) => {
    try {
      await updatePost(Number(id), data);
      router.push(`/blog/${id}?updated=true`);
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Post</h1>
      {initialData ? (
        <BlogForm initialData={initialData} onSubmit={handleUpdate} />
      ) : (
        <p>Loading post data...</p>
      )}
    </div>
  );
};

export default EditPostPage;
