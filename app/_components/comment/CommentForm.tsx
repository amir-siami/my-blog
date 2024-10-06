"use client";
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

interface CommentFormProps {
  onSubmit: (name: string, comment: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && comment) {
      onSubmit(name, comment);
      setName("");
      setComment("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6">Leave a Comment:</Typography>
      <TextField
        label="Your Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Your Comment"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit Comment
      </Button>
    </Box>
  );
};

export default CommentForm;
