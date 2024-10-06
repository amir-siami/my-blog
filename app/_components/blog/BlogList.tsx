"use client";

import { useState } from "react";
import { Pagination as MuiPagination } from "@mui/material";
import { BlogListProps } from "@/app/types/types";

import OutlinedCard from "./BlogItem";
import SearchBar from "../search/SearchBar";

const POSTS_PER_PAGE = 8;

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = POSTS_PER_PAGE;

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <>
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-200 mb-10 tracking-tight font-normal text-center">
        <span className="inline-block">Explore our Blog</span>
      </h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentPosts.map((post) => (
          <OutlinedCard key={post.id} post={post} />
        ))}
      </div>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        color="primary"
        variant="outlined"
        shape="rounded"
        sx={{
          marginTop: 2,
          marginBottom: 2,
          display: "flex",
          justifyContent: "center",
        }}
      />
    </>
  );
};

export default BlogList;
