import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDefaultApiState, handleApiState } from "./helper";
import { callAPI } from "../services/callApi";


const initialState = {
  getPuzzlesApi: getDefaultApiState(),
  createPuzzleApi: getDefaultApiState(),
  updatePuzzleApi: getDefaultApiState(),
  deletePuzzleApi: getDefaultApiState(),
};

export const getPuzzles = createAsyncThunk(
  "puzzles/getAll",
  async ({ page = 1 } = {}) => {
    const res = await callAPI(`/puzzle?page=${page}`);
    return res.data;
  }
);

export const createPuzzle = createAsyncThunk(
  "puzzles/create",
  async (data) => {
    const res = await callAPI(`/puzzle`, {
      method: "POST",
      data,
    });
    return res.data;
  }
);

export const updatePuzzle = createAsyncThunk(
  "puzzles/update",
  async ({ id, data }) => {
    const res = await callAPI(`/puzzle/${id}`, {
      method: "PUT",
      data,
    });
    return res.data;
  }
);

export const deletePuzzle = createAsyncThunk(
  "puzzles/delete",
  async (id) => {
    const res = await callAPI(`/puzzle/${id}`, {
      method: "DELETE",
    });
    return res.data;
  }
);

export const PuzzlesSlice = createSlice({
  name: "puzzles",
  initialState,
  reducers: {
    resetApiStateFromPuzzle(state, action) {
      const key = action.payload;
      if (state[key]) {
        state[key] = getDefaultApiState();
      }
    },
  },
  extraReducers: (builder) => {
    handleApiState(builder, getPuzzles, "getPuzzlesApi");
    handleApiState(builder, createPuzzle, "createPuzzleApi");
    handleApiState(builder, updatePuzzle, "updatePuzzleApi");
    handleApiState(builder, deletePuzzle, "deletePuzzleApi");
  },
});

export const { resetApiStateFromPuzzle } = PuzzlesSlice.actions;

export default PuzzlesSlice.reducer;