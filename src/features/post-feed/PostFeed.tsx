/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

import { selectAllPosts, fetchPosts, PostsStatus } from "./postsSlice";
import { AppDispatch, RootState } from "../../store/store";
import { PostCard } from "../post-card/PostCard";
import { useAppSelector } from "../../store/hooks";
import { selectUser, UserState } from "../login/loginSlice";

import './PostFeed.css';

export const PostsFeed = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectAllPosts);

  const postStatus = useSelector<RootState, PostsStatus>((state) => state.posts.status);

  const user: UserState = useAppSelector<UserState>((state) =>
    selectUser(state)
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (postStatus.status === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus]);

  useEffect(() => {
    if(!user.user) navigate('/login');
  }, [user])

  return (
      <div className="post-feed-container">
          <BarLoader loading={postStatus.status === 'loading'} />
          {posts.map((post) => {
            return <PostCard {...post} />
          })}
      </div>
  )

};
