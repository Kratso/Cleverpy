import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BarLoader } from "react-spinners";

import { selectAllPosts, fetchPosts, PostsStatus } from "../../store/postsSlice";
import { AppDispatch, RootState } from "../../store/store";
import { PostCard } from "../post-card/PostCard";

export const PostsFeed = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectAllPosts);

  const postStatus = useSelector<RootState, PostsStatus>((state) => state.posts.status);

  useEffect(() => {
    if (postStatus.status === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  return (
      <div className="post-feed-container">
          <BarLoader loading={postStatus.status === 'loading'} />
          {posts.map((post) => {
            return <PostCard {...post} />
          })}
      </div>
  )

};
