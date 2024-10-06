"use client";

import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import CommentForm from "@/app/_components/comment/CommentForm";

const CommentSection = ({ initialComments }) => {
  const [comments, setComments] = useState(initialComments);

  const handleCommentSubmit = (name, comment) => {
    const newComment = {
      id: comments.length + 1,
      name,
      body: comment,
    };

    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <>
      <CommentForm onSubmit={handleCommentSubmit} />
      <Divider style={{ margin: "16px 0" }} />
      <Typography variant="h6" component="h2" gutterBottom>
        Comments:
      </Typography>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemText
              primary={<strong>{comment.name}</strong>}
              secondary={comment.body}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default CommentSection;
