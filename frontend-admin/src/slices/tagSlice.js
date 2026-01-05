import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDefaultApiState, handleApiState } from "./helper";
import { callAPI } from "../services/callApi";

const initialState = {
    getTagsApi: getDefaultApiState(),
    createTagApi: getDefaultApiState(),
    updateTagApi: getDefaultApiState(),
    deleteTagApi: getDefaultApiState(),
};

export const getTags = createAsyncThunk(
    `tag/getTags`,
    async ({ page = 1, limit = 100 } = {}) => {
        const res = await callAPI(`/tags?page=${page}&limit=${limit}`);
        return res.data;
    }
);

export const createTag = createAsyncThunk(
    `tag/createTag`,
    async (data) => {
        const res = await callAPI(`/tags`, {
            method: "POST",
            data
        });
        return res.data;
    }
);

export const updateTag = createAsyncThunk(
    `tag/updateTag`,
    async ({ id, data }) => {
        const res = await callAPI(`/tags/${id}`, {
            method: "PUT",
            data
        });
        return res.data;
    }
);

export const deleteTag = createAsyncThunk(
    `tag/deleteTag`,
    async (id) => {
        const res = await callAPI(`/tags/${id}`, {
            method: "DELETE"
        });
        return res.data;
    }
);

const tagSlice = createSlice({
    name: "tag",
    initialState,
    reducers: {
        resetApiStateFromTag(state, action) {
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
        handleApiState(builder, getTags, "getTagsApi");
        handleApiState(builder, createTag, "createTagApi");
        handleApiState(builder, updateTag, "updateTagApi");
        handleApiState(builder, deleteTag, "deleteTagApi");
    },
});

export const { resetApiStateFromTag } = tagSlice.actions;

export default tagSlice.reducer;