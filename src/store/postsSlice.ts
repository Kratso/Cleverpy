import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState, AppThunk } from "./store";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostsStatus {
  status: "idle" | "loading" | "OK" | "KO";
  error: string | null | undefined;
}

export interface PostState {
  status: PostsStatus;
  posts: Post[];
}

const initialState: PostState = {
  status: { 
      status: "idle",
      error: null 
  },
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postUpdated(state, action) {
      const {id, title, body} = action.payload;

      const existingPost = state.posts.find(post => post.id === id)

      if (existingPost) {
        existingPost.title = title;
        existingPost.body = body;
      }
    },
    postDeleted(state, action) {
      const { id } = action.payload;

      state.posts.forEach( (item, index) => {
        if(item.id === id) state.posts.splice(index, 1);
      })
      
    }
  },
  extraReducers(builder) {
    builder
        .addCase(fetchPosts.pending, (state, actions) => {
          state.status.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status.status = 'OK'
          // Add any fetched posts to the array
          state.posts = state.posts.concat(action.payload)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status.status = 'KO'
          state.status.error = action.error.message
        })
  }
});

export const { postUpdated, postDeleted } = postsSlice.actions;

export default postsSlice.reducer;

// All posts are shuffled because I was losing my mind looking at the same 3 posts everytime, even if they are Lorem Ipsum.
export const selectAllPosts = (state: RootState) => {
  const shuffledArray = [...state.posts.posts].sort(() => (0.5 - Math.random()))

  return shuffledArray;
};

export const selectPostById = (state: RootState, postId: number) =>
  state.posts.posts.find((post: Post) => post.id === postId);

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return response.data as Post[]
})