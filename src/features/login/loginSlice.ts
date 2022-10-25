import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";
import { User } from "./usersSlice";

import AuthService from "../../services/login/auth.service";

export interface UserStatus {
  status: "idle" | "loading" | "OK" | "KO";
  error: string | null | undefined;
}

export interface UserState {
  status: UserStatus;
  user: User | null;
}

const initialState: UserState = {
  status: {
    status: "idle",
    error: null,
  },
  user: null,
};

const userData = createSlice({
  name: "userData",
  initialState,
  reducers: {
    login(state, action) {
      const { user, status } = action.payload;

      state.status = status;
      if (user) {
        state.user = user;
      }
    },
    logout(state, action) {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginMiddle.pending, (state, actions) => {
        state.status.status = "loading";
      })
      .addCase(loginMiddle.fulfilled, (state, action) => {
        state.status.status = "OK";
        // Add the user to the state

        state.user = action.payload.user;
      })
      .addCase(loginMiddle.rejected, (state, action) => {
        state.status.status = "KO";
        state.status.error = action.error.message;
      });
  },
});

export const { login, logout } = userData.actions;

export default userData.reducer;

export const selectUser: (state: RootState) => UserState = (state: RootState) =>
  state.userData;

export const loginMiddle = createAsyncThunk<
  UserState,
  { username: string; password: string }
>("userData/login", async (authData) => {
  const { username, password } = authData;
  return await AuthService.login(username, password);
});
