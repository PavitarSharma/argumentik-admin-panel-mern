import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../utils/dataService";
const backendURL = "https://argumentik-abckend-nodejs.onrender.com";

export const createContent = createAsyncThunk(
  "data/createContent",
  async ({ image, content }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${backendURL}/content/add`,
        {
          image,
          content,
        },
        {
          headers: authHeader(),
        }
      );
      const data = await res.data;
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createPopupMessage = createAsyncThunk(
  "data/createPopupMessage",
  async ({ name, contact }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${backendURL}/data/add`,
        {
          name,
          contact,
        },
        {
          headers: authHeader(),
        }
      );
      const data = await res.data;
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllContent = createAsyncThunk(
  "content/getAllContent",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backendURL}/content`, {
        headers: authHeader(),
      });

      return data;
    } catch (error) {
      console.error(error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllPopupMessages = createAsyncThunk(
  "data/getAllPopupMessages",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backendURL}/data`, {
        headers: authHeader(),
      });

      return data;
    } catch (error) {
      console.error(error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const contentSlice = createSlice({
  name: "content",
  initialState: {
    content: {},
    popupData: {},
    popupDatas: [],
    contents: [],
    loading: false,
    success: false,
    error: false,
    message: "",
  },
  reducers: {},
  extraReducers: (bulder) => {
    bulder
      .addCase(createContent.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload.data;
        state.success = true;
      })
      .addCase(createContent.rejected, (state, action) => {
        state.loading = false;
        state.message = true;
        state.content = null;
        state.error = action.payload;
      })

      .addCase(createPopupMessage.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createPopupMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.popupData = action.payload.data;
        state.success = true;
      })
      .addCase(createPopupMessage.rejected, (state, action) => {
        state.loading = false;
        state.message = true;
        state.popupData = null;
        state.error = action.payload;
      })

      .addCase(getAllContent.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllContent.fulfilled, (state, action) => {
        state.loading = false;
        state.contents = action.payload.contents;
        state.error = null;
        state.success = true;
      })
      .addCase(getAllContent.rejected, (state, action) => {
        state.loading = false;
        state.message = true;
        state.contents = null;
        state.error = action.payload;
      })

      .addCase(getAllPopupMessages.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllPopupMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.popupDatas = action.payload.datas;
        state.error = null;
        state.success = true;
      })
      .addCase(getAllPopupMessages.rejected, (state, action) => {
        state.loading = false;
        state.message = true;
        state.popupDatas = null;
        state.error = action.payload;
      });
  },
});

export default contentSlice.reducer;
