import * as React from "react";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

import Link from "next/link";

import PersonIcon from "@mui/icons-material/Person";
import { OutlinedCardProps } from "@/app/types/types";

const OutlinedCard: React.FC<OutlinedCardProps> = ({ post }) => {
  return (
    <Box
      sx={{ minWidth: 275, marginBottom: 2 }}
      className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1"
    >
      <Card
        style={{
          border: "none",
          boxShadow: "none",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.body}
          </Typography>
          <div className="flex items-center mt-2">
            <PersonIcon className="mr-1 text-primary-500" fontSize="small" />
            <Typography
              variant="body2"
              component="span"
              className="text-gray-500"
            >
              By: {post.author}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Link href={`/blog/${post.id}`} style={{ textDecoration: "none" }}>
            <Button size="small">Learn More</Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
};

export default OutlinedCard;
