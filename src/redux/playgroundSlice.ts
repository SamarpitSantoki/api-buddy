import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import { IPlayground } from "@/types/playgroundTypes";
import { TGetRequestResponse } from "@/types/types";

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
  async (workspaceId: string) => {
    const res = await axios.get("/api/request?workspaceId=" + workspaceId);

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
    createPlayground: (state, action: PayloadAction<any>) => {
      state.activePlaygrounds.push(action.payload);
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

    updatePlayground: (state, action: PayloadAction<IPlayground>) => {
      state.activePlaygrounds = state.activePlaygrounds.map((playground) =>
        playground.id === action.payload.id ? action.payload : playground
      );
    },

    removeActivePlayground: (state, action: PayloadAction<string>) => {
      state.activePlaygrounds = state.activePlaygrounds.filter(
        (playground) => playground.id !== action.payload
      );
    },
    closeAllActive: (state) => {
      state.activePlaygrounds = []
      state.playgrounds = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPlaygrounds.fulfilled, (state, action) => {
      console.log("check this", action.payload);

      state.playgrounds = action.payload.map(
        (playground: TGetRequestResponse) => ({
          id: playground.id,
          title: playground.title,
          playgroundState: {
            isSaved: true,
            isEdited: false,
            isSaving: false,
          },
          request: {
            id: playground.id,
            url: playground.requestUrl,
            method: playground.requestMethod,
            headers: playground.headerParams
              ? JSON.parse(playground.headerParams)
              : [],
            params: playground.queryParams
              ? JSON.parse(playground.queryParams)
              : [],

            body: playground.jsonParams,
          },
        })
      );
    });
  },
});

export const {
  addPlaygrounds,
  addActivePlaygrounds,
  addActivePlayground,
  addCurrentPlayground,
  removeActivePlayground,
  closeAllActive,
  updatePlayground,
  createPlayground,
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
