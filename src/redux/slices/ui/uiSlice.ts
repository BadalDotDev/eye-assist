import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isAppLoading: boolean;
}

const initialState: UIState = {
  isAppLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.isAppLoading = action.payload;
    },
  },
});

export const { setAppLoading } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
