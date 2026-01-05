import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDefaultApiState, handleApiState } from "./helper";
import { callAPI } from "../services/callApi";

const initialState = {
  getPlayerApi: getDefaultApiState(),
  createPlayerApi: getDefaultApiState(),
  getPlayersDropdownApi: getDefaultApiState(),
};

// thunk to fetch game info
export const getPlayer = createAsyncThunk(
  `players/getPlayer`,
  async ({ page = 1, searchTerm = "" }) => {
    const q = searchTerm ? `&search=${searchTerm}` : "";
    const pureUrl = `/player-admin?page=${page}${q}`;
    const res = await callAPI(pureUrl, {
      method: "GET",
    });
    return res.data;
  }
);
export const getPlayersDropdown = createAsyncThunk(
  `players/getPlayerDropdown`,
  async () => {
    const res = await callAPI(`/player-admin/list-dropdown`);
    return res.data;
  }
);

export const createPlayer = createAsyncThunk(
  `players/create`,
  async (playerData) => {
    const res = await callAPI(`/player-admin`, {
      method: "POST",
      data: playerData,
    });
    return res.data;
  }
);

const gameSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    resetApiStateFromPlayer(state, action) {
      const key = action.payload;
      if (state[key]) {
        state[key] = initialState[key];
      }
    },
  },
  extraReducers: (builder) => {
    handleApiState(builder, getPlayer, "getPlayerApi");
    handleApiState(builder, createPlayer, "createPlayerApi");
    handleApiState(builder, getPlayersDropdown, "getPlayersDropdownApi");
  },
});

export const { resetApiStateFromPlayer } = gameSlice.actions;

export default gameSlice.reducer;
