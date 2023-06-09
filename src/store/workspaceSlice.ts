import { IRequest } from '@/types/types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ICreateWorkspace {
  name: string;
  userId: string;
  invites: { email: string }[];
  type?: string;
  description?: string;
}

interface IWorkspace {
  id: string;
  name: string;
  type: string;
  requests: IRequest[];
  decription?: string;
  createdAt: string;
  updatedAt: string;
}

interface WorkspaceState {
  workspaces: IWorkspace[];
  currentWorkspace: IWorkspace | null;
  isFetching: boolean;
  isCreating: boolean;
  isUpdating: boolean;
}

const initialState: WorkspaceState = {
  workspaces: [],
  currentWorkspace: null,
  isFetching: true,
  isCreating: false,
  isUpdating: false,
};

export const getWorkspaces = createAsyncThunk(
  'workspace/getWorkspaces',
  async () => {
    const response = await fetch('/api/workspace', {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }
);

export const createWorkspace = createAsyncThunk(
  'workspace/createWorkspace',
  async (data: ICreateWorkspace) => {
    const response = await fetch('/api/workspace', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  }
);

export const deleteWorkspace = createAsyncThunk(
  'workspace/deleteWorkspace',
  async (id: string) => {
    const response = await fetch(`/api/workspace?id=${id}`, {
      method: 'DELETE',
    });
    const res = await response.json();
    return res;
  }
);

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setWorkspaces: (state, action: PayloadAction<IWorkspace[]>) => {
      state.workspaces = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWorkspaces.pending, (state) => {
      state.isFetching = true;
      state.workspaces = [];
    });

    builder.addCase(getWorkspaces.fulfilled, (state, action) => {
      state.workspaces = action.payload.data;
      state.isFetching = false;
    });
    builder.addCase(getWorkspaces.rejected, (state) => {
      state.isFetching = false;
    });
    builder.addCase(createWorkspace.pending, (state) => {
      state.isCreating = true;
    });
    builder.addCase(createWorkspace.fulfilled, (state, action) => {
      state.isCreating = false;
      state.workspaces.push(action.payload.data);
    });
    builder.addCase(createWorkspace.rejected, (state) => {
      state.isCreating = false;
    });
    builder.addCase(deleteWorkspace.pending, (state) => {
      state.isUpdating = true;
    });
    builder.addCase(deleteWorkspace.fulfilled, (state, action) => {
      state.isUpdating = false;
      state.workspaces = state.workspaces.filter(
        (w) => w.id !== action.payload.data.id
      );
    });
    builder.addCase(deleteWorkspace.rejected, (state) => {
      state.isUpdating = false;
    });
  },
});

export const { setWorkspaces } = workspaceSlice.actions;

export default workspaceSlice.reducer;
