import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import { IPlayground } from "@/types/types";

// Define a type for the slice state
interface PlaygroundSlice {
  playgrounds: IPlayground[];
  activePlaygrounds: IPlayground[];
  currentPlayground: IPlayground | null;
}

// Define the initial state using that type
const initialState: PlaygroundSlice = {
  playgrounds: [],
  activePlaygrounds: [],
  currentPlayground: null,
};

export const getPlaygrounds = createAsyncThunk(
  "playground/getPlaygrounds",
  async () => {
    const res = await axios.get("/api/request");

    return res.data.data;
  }
);

export const playgroundSlice = createSlice({
  name: "playground",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addPlaygrounds: (state, action: PayloadAction<IPlayground[]>) => {
      state.playgrounds = action.payload;
    },
    addActivePlaygrounds: (state, action: PayloadAction<IPlayground[]>) => {
      state.activePlaygrounds = action.payload;
    },
    addActivePlayground: (state, action: PayloadAction<IPlayground>) => {
      state.activePlaygrounds.push(action.payload);
    },
    addCurrentPlayground: (state, action: PayloadAction<IPlayground>) => {
      state.currentPlayground = action.payload;
    },
    removeActivePlayground: (state, action: PayloadAction<number>) => {
      state.activePlaygrounds = state.activePlaygrounds.filter(
        (playground) => playground.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPlaygrounds.fulfilled, (state, action) => {
      console.log(action.payload);

      state.playgrounds = action.payload;
    });
  },
});

export const {
  addPlaygrounds,
  addActivePlaygrounds,
  addActivePlayground,
  addCurrentPlayground,
  removeActivePlayground,
} = playgroundSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPlaygrounds = (state: RootState) =>
  state.playground.playgrounds;

export const selectActivePlaygrounds = (state: RootState) =>
  state.playground.activePlaygrounds;

export const selectCurrentPlayground = (state: RootState) =>
  state.playground.currentPlayground;

export const playgroundSliceState = (state: RootState) => state.playground;

export default playgroundSlice.reducer;
