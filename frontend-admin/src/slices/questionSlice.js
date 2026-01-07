import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDefaultApiState, handleApiState } from "./helper";
import { callAPI } from "../services/callApi";

const initialState = {
  createQuestionApi: getDefaultApiState(),
  createCommentApi: getDefaultApiState(),
  createMediaApi: getDefaultApiState(),
  createSettingsApi: getDefaultApiState(),
  getAllQuestionsApi: getDefaultApiState(),
  getQuestionByIdApi: getDefaultApiState(),
  updateQuestionApi: getDefaultApiState(),
  getCommentsApi: getDefaultApiState(),
  getMediaApi: getDefaultApiState(),
  getSettingsApi: getDefaultApiState(),
  deleteQuestionApi: getDefaultApiState(),
  deleteQuestionsApi: getDefaultApiState(),
  cloneQuestionApi: getDefaultApiState(),
};

export const createQuestion = createAsyncThunk(
  `question/create`,
  async (data) => {
    const res = await callAPI(`/questions`, {
      method: "POST",
      data,
    });

    return res.data;
  }
);

export const createComment = createAsyncThunk(
  `comments/create`,
  async ({ questionId, data }) => {
    const res = await callAPI(`/question-comments/${questionId}`, {
      method: "POST",
      data,
    });
    return res.data;
  }
);

export const createMedia = createAsyncThunk(
  `media/create`,
  async ({ questionId, data }) => {
    const res = await callAPI(`/question-media/${questionId}`, {
      method: "POST",
      data,
    });
    return res.data;
  }
);

export const createSettings = createAsyncThunk(
  `settings/create`,
  async ({ questionId, data }) => {
    const res = await callAPI(`/question-settings/${questionId}`, {
      method: "POST",
      data,
    });
    return res.data;
  }
);

export const getAllQuestions = createAsyncThunk(
  `question/getAll`,
  async ({ page = 1, searchTerm = "", tags = "" } = {}) => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("t", Date.now());
    if (searchTerm) {
      params.append("search", searchTerm);
    }
    if (tags) {
      params.append("tags", tags);
    }

    const res = await callAPI(`/questions?${params.toString()}`);
    return res.data;
  }
);

export const getQuestionById = createAsyncThunk(
  `question/questionsById`,
  async (id) => {
    const res = await callAPI(`/questions/${id}`);
    return res.data;
  }
);

export const updateQuestion = createAsyncThunk(
  `question/update`,
  async ({ id, data }) => {
    const res = await callAPI(`/questions/${id}`, {
      method: "PUT",
      data,
    });

    return res.data;
  }
);

export const getComments = createAsyncThunk(
  `question/commentsById`,
  async (id) => {
    const res = await callAPI(`/question-comments/${id}`);
    return res.data;
  }
);

export const getMedia = createAsyncThunk(`question/mediaById`, async (id) => {
  const res = await callAPI(`/question-media/${id}`);
  return res.data;
});

export const getSettings = createAsyncThunk(
  `question/settingsById`,
  async (id) => {
    const res = await callAPI(`/question-settings/${id}`);
    return res.data;
  }
);
export const deleteQuestion = createAsyncThunk(
  `question/media/delete`,
  async (id) => {
    const res = await callAPI(`/questions/${id}`, {
      method: "DELETE",
    });
    return res.data;
  }
);

export const deleteQuestions = createAsyncThunk(
  `questions/delete`,
  async (data) => {
    const res = await callAPI(`/questions/multiple-delete`, {
      method: "POST",
      data,
    });
    return res.data;
  }
);

export const cloneQuestion = createAsyncThunk(`questions/clone`, async (id) => {
  const res = await callAPI(`/questions/clone/${id}`);
  return res.data;
});

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    resetApiStateFromQuestion(state, action) {
      // console.log("reset working");
      const key = action.payload;
      // console.log(state[key]);
      if (state[key]) {
        state[key] = {
          status: null,
          isLoading: false,
          data: null,
          error: null,
        };
      }
      // console.log(state[key]);
    },
  },
  extraReducers: (builder) => {
    handleApiState(builder, createQuestion, "createQuestionApi");
    handleApiState(builder, createComment, "createCommentApi");
    handleApiState(builder, createMedia, "createMediaApi");
    handleApiState(builder, createSettings, "createSettingsApi");
    handleApiState(builder, getAllQuestions, "getAllQuestionsApi");
    handleApiState(builder, getQuestionById, "getQuestionByIdApi");
    handleApiState(builder, updateQuestion, "updateQuestionApi");
    handleApiState(builder, getComments, "getCommentsApi");
    handleApiState(builder, getMedia, "getMediaApi");
    handleApiState(builder, getSettings, "getSettingsApi");
    handleApiState(builder, deleteQuestion, "deleteQuestionApi");
    handleApiState(builder, deleteQuestions, "deleteQuestionsApi");
    handleApiState(builder, cloneQuestion, "cloneQuestionApi");
  },
});

export const { resetApiStateFromQuestion } = questionSlice.actions;

export default questionSlice.reducer;
