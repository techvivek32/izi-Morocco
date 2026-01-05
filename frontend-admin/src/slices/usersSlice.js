import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDefaultApiState, handleApiState } from "./helper";
import { callAPI } from "../services/callApi";

const initialState = {
  getUsersApi: getDefaultApiState(),
  createUserApi: getDefaultApiState(),
  getUserGroupsApi: getDefaultApiState(),
  updateUserApi: getDefaultApiState(),
  deleteUserApi: getDefaultApiState(),
  verifyAuthApi: getDefaultApiState(),
};

// thunk to fetch users
export const getUsers = createAsyncThunk(
  `users/get`,
  async ({ page = 1 } = {}) => {
    const res = await callAPI(`/users?page=${page}`, {
      method: "GET",
    });
    return res.data;
  }
);

export const createUser = createAsyncThunk(
  `users/create`,
  async (payload = {}) => {
    const res = await callAPI(`/users`, {
      method: "POST",
      data: payload,
    });
    return res.data;
  }
);

export const getUserGroups = createAsyncThunk(
  `users/groups/get`,
  async (params = {}) => {
    const res = await callAPI(`/user-groups`, {
      method: "GET",
      params,
    });
    return res.data;
  }
);

export const updateUser = createAsyncThunk(
  `users/update`,
  async ({ id, data } = {}) => {
    const res = await callAPI(`/users/${id}`, {
      method: "PUT",
      data,
    });
    return res.data;
  }
);

export const verifyAuth = createAsyncThunk(
  `auth/verify`,
  async () => {
    const res = await callAPI(`/auth/verify-tokens`);
    return res.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetApiStateFromUser(state, action) {
      const key = action.payload;
      if (state[key]) {
        state[key] = {
          status: null,
          isLoading: false,
          data: null,
          error: null,
        };
      }
    },
  },

  extraReducers: (builder) => {
    handleApiState(builder, getUsers, "getUsersApi");
    handleApiState(builder, createUser, "createUserApi");
    handleApiState(builder, getUserGroups, "getUserGroupsApi");
    handleApiState(builder, updateUser, "updateUserApi");
    handleApiState(builder, verifyAuth, "verifyAuthApi");
  },
});

export const { resetApiStateFromUser } = usersSlice.actions;

export default usersSlice.reducer;
