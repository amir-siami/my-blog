"use client";

import React, { useEffect, useState } from "react";
import { Paper, Typography, Divider, CardActions, Button } from "@mui/material";
import { useParams } from "next/navigation";
import {
  fetchPostById,
  fetchPostAuthor,
  updatePost,
  fetchPostComments,
} from "@/app/_utils/api";
import CommentSection from "@/app/_components/comment/CommentSection";
import BlogForm from "@/app/_components/blog/BlogForm";
import { Post, Comment, Author } from "@/app/types/types";
import Spinner from "@/app/_components/spinner/Spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostDetailAndEditPage() {
  const { id } = useParams();
  const [postData, setPostData] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [author, setAuthor] = useState<Author | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    console.log("Post ID:", id); // Log the ID when entering the detail page

    const fetchPostData = async () => {
      if (id) {
        try {
          const post = await fetchPostById(Number(id));
          setPostData(post);

          const authorData = await fetchPostAuthor(post.userId);
          setAuthor(authorData);

          const commentsData = await fetchPostComments(post.id);
          setComments(commentsData);
        } catch (error) {
          console.error("Failed to fetch post:", error);
        } finally {
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

      setPostData((prevData) => {
        if (prevData) {
          return {
            ...prevData,
            title: data.title,
            body: data.body,
            author: data.author,
          };
        }
        return null;
      });
      setIsEditing(false);
      toast.success("Post updated successfully!");
    } catch (error) {
      console.error("Failed to update post:", error);
      toast.error("Failed to update post.");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <ToastContainer />
      <Paper elevation={3} style={{ padding: "16px", margin: "16px 0" }}>
        {isEditing ? (
          <div>
            <BlogForm
              onSubmit={handleUpdate}
              initialData={{
                title: postData?.title || "",
                body: postData?.body || "",
                author: postData?.author || "",
              }}
              isEdit={true}
            />
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        ) : (
          <div>
            <Typography variant="h4" component="h1" gutterBottom>
              {postData?.title}
            </Typography>
            <Typography variant="body1">{postData?.body}</Typography>
            <Typography variant="body2">
              <strong>Author:</strong> {author ? author.name : "Loading..."}
            </Typography>
            <Typography variant="body2">
              <strong>Date of Publication:</strong>{" "}
              {new Date().toLocaleDateString()}
            </Typography>
            <CardActions>
              <Button
                onClick={() => setIsEditing(true)}
                type="submit"
                variant="contained"
                color="primary"
              >
                Edit Post
              </Button>
            </CardActions>
            <Divider style={{ margin: "16px 0" }} />
            <CommentSection initialComments={comments} />
          </div>
        )}
      </Paper>
    </>
  );
}
