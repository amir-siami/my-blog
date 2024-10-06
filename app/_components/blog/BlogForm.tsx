"use client";

import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { PostFormProps } from "@/app/types/types";

const BlogForm: React.FC<PostFormProps> = ({
  initialData,
  onSubmit,
  isEdit,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [body, setBody] = useState(initialData?.body || "");
  const [author, setAuthor] = useState(initialData?.author || "");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !body) return;
    onSubmit({ title, body, author });
  };

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setBody(initialData.body);
    }
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      {!isEdit && (
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
          margin="normal"
        />
      )}
      <Button type="submit" variant="contained" color="primary">
        {isEdit ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
};

export default BlogForm;
