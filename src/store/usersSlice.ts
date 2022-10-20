import { createSlice } from "@reduxjs/toolkit";
import { use } from "i18next";

import { RootState, AppThunk } from "./store";

export interface User {
  id: number;
  name: string;
  followers: number
}

// Random userbase created arbitrarily because I found it too hilarious not to.
// should probably be substituted for some dynamic fetching of usernames based on the ID over the DB.
// Or actually adding that data to the post API 
const initialState: User[] = [
    {
        id: 1,
        name: 'Zéphyrine Nilüfer',
        followers: 4410,
    }, 
    {
        id: 2,
        name: 'Ansley Bahram',
        followers: 13739,
    }, 
    {
        id: 3,
        name: 'Reece Itumeleng',
        followers: 17309,
    }, 
    {
        id: 4,
        name: 'Quinctilius Jelena',
        followers: 4604,
    }, 
    {
        id: 5,
        name: 'Grímhildr Hakan',
        followers: 6086,
    }, 
    {
        id: 6,
        name: 'Công Alex',
        followers: 17082,
    }, 
    {
        id: 7,
        name: 'Kateryna Toribio',
        followers: 9553,
    }, 
    {
        id: 8,
        name: 'Ademar Daniil',
        followers: 6981,
    }, 
    {
        id: 9,
        name: 'Varinius Valter',
        followers: 2767,
    }, 
    {
        id: 10,
        name: 'Inocencio Bernhard',
        followers: 16131,
    }, 
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
      userReducer(state, action) {
          return state;
      }
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = usersSlice.actions;

export default usersSlice.reducer;

export const selectAllUsers = (state: RootState) => state.users;

export const selectUserById = (state: RootState, userId: number) => {
    let user =  state.users.find((user: User) => user.id === userId);
    return user || {
        id: -1,
        name: 'Mystery User #1337',
        followers: 999999999,
    };
}
  
