export const getDefaultApiState = () => ({
  status: null,
  isLoading: false,
  data: null,
  error: null,
});

export const handleApiState = (builder, thunk, stateKey) => {
  builder
    .addCase(thunk.pending, (state) => {
      state[stateKey] = {
        isLoading: true,
        status: "pending",
      };
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state[stateKey] = {
        isLoading: false,
        status: "success",
        data: action.payload,
      };
    })
    .addCase(thunk.rejected, (state, action) => {
      let error;
      try {
        error = JSON.parse(action.error.message);
      } catch {
        error = { message: action.error.message };
      }

      state[stateKey] = {
        isLoading: false,
        status: "failed",
        error,
      };
    });
};
