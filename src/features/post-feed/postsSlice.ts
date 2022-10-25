import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import fetchPostsService from "../../services/posts/post.service";
import { RootState } from "../../store/store";

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
    postUpdate(state, action) {
      const {id, title, body} = action.payload;

      const existingPost = state.posts.find(post => post.id === id)

      if (existingPost) {
        existingPost.title = title;
        existingPost.body = body;
      }
    },
    postDelete(state, action) {
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

          //filter duplicate ids
          state.posts = state.posts.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status.status = 'KO'
          state.status.error = action.error.message
        })
  }
});

export const { postUpdate, postDelete } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts: (state: RootState)=>Post[] = (state: RootState) => state.posts.posts;

export const selectPostById = (state: RootState, postId: number) =>
  state.posts.posts.find((post: Post) => post.id === postId);

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetchPostsService();
  return response.data as Post[]
})