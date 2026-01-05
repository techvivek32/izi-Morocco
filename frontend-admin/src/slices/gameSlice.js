import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDefaultApiState, handleApiState } from "./helper";
import { callAPI } from "../services/callApi";

const initialState = {
  getGameInfoApi: getDefaultApiState(),
  createGameApi: getDefaultApiState(),
  updateGameApi: getDefaultApiState(),
  deleteGameApi: getDefaultApiState(),
  toggleGameStatusApi: getDefaultApiState(),
  selectedQuestions: [],
  selectedQuestion: null,
  blocklyData: {
    blocksJson: {},
    blocksXml: "",
  },
  getGameInfobyIdApi: getDefaultApiState(),
  upsertGameQuestionsApi: getDefaultApiState(),
  getGameQuestionsApi: getDefaultApiState(),
  cloneGameApi: getDefaultApiState(),
};

// thunk to fetch game info
export const getGameInfo = createAsyncThunk(
  `games/getInfo`,
  async ({ page, searchTerm = "" }) => {
    const q = searchTerm ? `&search=${searchTerm}` : "";
    const pureUrl = `/game-info?page=${page}${q}`;
    const res = await callAPI(pureUrl, {
      method: "GET",
    });
    return res.data;
  }
);
export const getGameInfobyId = createAsyncThunk(
  `games/getInfoById`,
  async (gameId) => {
    const res = await callAPI(`/game-info/${gameId}`, {
      method: "GET",
    });
    return res.data;
  }
);

// thunk to create game
export const createGame = createAsyncThunk(`games/create`, async (gameData) => {
  const res = await callAPI(`/game-info`, {
    method: "POST",
    data: gameData,
  });
  return res.data;
});

// thunk to update game
export const updateGame = createAsyncThunk(
  `games/update`,
  async ({ gameId, gameData }) => {
    const res = await callAPI(`/game-info/${gameId}`, {
      method: "PUT",
      data: gameData,
    });
    return res.data;
  }
);

// thunk to delete game
export const deleteGame = createAsyncThunk(`games/delete`, async (gameId) => {
  const res = await callAPI(`/game-info/${gameId}`, {
    method: "DELETE",
  });
  return res.data;
});

// thunk to toggle game active status
export const toggleGameStatus = createAsyncThunk(
  `games/toggleStatus`,
  async ({ gameId, status }) => {
    // send explicit status to backend so server can set the desired state
    const res = await callAPI(`/game-info/${gameId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      data: { status },
    });
    return res.data;
  }
);

export const upsertGameQuestions = createAsyncThunk(
  `games/upsertQuestions`,
  async (data) => {
    const res = await callAPI(`/game-questions`, {
      method: "POST",
      data,
    });
    return res.data;
  }
);

export const getGameQuestions = createAsyncThunk(
  `games/getQuestions`,
  async (gameId) => {
    const res = await callAPI(`/game-questions/${gameId}`);
    return res.data;
  }
);

export const cloneGame = createAsyncThunk(`games/clone`, async (id) => {
  const res = await callAPI(`/game-info/clone/${id}`);
  return res.data;
});

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    resetApiStateFromGames(state, action) {
      const key = action.payload;
      if (state[key]) {
        state[key] = initialState[key];
      }
    },
    setSelectedQuestions(state, action) {
      state.selectedQuestions = action.payload;
    },
    setSelectedQuestionFromQuestions(state) {
      state.selectedQuestion =
        state.selectedQuestions.find((q) => q.isSelected) || null;
    },
    setSelectedQuestion(state, action) {
      state.selectedQuestion = action.payload;
    },
    setBlocklyData(state, action) {
      state.blocklyData = action.payload;
    },
  },
  extraReducers: (builder) => {
    handleApiState(builder, getGameInfo, "getGameInfoApi");
    handleApiState(builder, createGame, "createGameApi");
    handleApiState(builder, updateGame, "updateGameApi");
    handleApiState(builder, deleteGame, "deleteGameApi");
    handleApiState(builder, toggleGameStatus, "toggleGameStatusApi");
    handleApiState(builder, getGameInfobyId, "getGameInfobyIdApi");
    handleApiState(builder, upsertGameQuestions, "upsertGameQuestionsApi");
    handleApiState(builder, getGameQuestions, "getGameQuestionsApi");
    handleApiState(builder, cloneGame, "cloneGameApi");
  },
});

export const {
  resetApiStateFromGames,
  setSelectedQuestions,
  setSelectedQuestion,
  setSelectedQuestionFromQuestions,
  setBlocklyData,
} = gameSlice.actions;

export default gameSlice.reducer;
