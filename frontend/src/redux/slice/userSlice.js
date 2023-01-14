import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient from "../../utils/axiosClient";
import authHeader from "../../utils/dataService";
const backendURL = "http://localhost:5000";

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${backendURL}/user/register`,
        {
          name,
          email,
          password,
        },
        config
      );
      const data = await res.data;
      if (data.token) {
        localStorage.setItem("token", JSON.stringify(data?.token));
      }

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

export const signIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/user/login`,

        {
          email,
          password,
        },
        config
      );

      // store user's token in local storage
      localStorage.setItem("user", JSON.stringify(data));

      return data.data;
    } catch (error) {
      console.log(error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUserRole = createAsyncThunk(
  "auth/updateUserRole",
  async ({ id, jsonData, toast }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `${backendURL}/user/${id}`,
        jsonData,
        config
      );
      toast.success("User updated.");

      return data;
    } catch (error) {
      console.log(error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateSocialLinks = createAsyncThunk(
  "auth/updateSocialLink",
  async ({ id, jsonData, toast }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `${backendURL}/user/profile/${id}`,
        jsonData,
        config
      );
      toast.success("Socail Links updated.");

      return data;
    } catch (error) {
      console.log(error);
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllUser = createAsyncThunk(
  "auth/getAllUser",
  async (_, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON

      const { data } = await axios.get(`${backendURL}/user`, {
        headers: authHeader(),
      });
      console.log(data);
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

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    users: [],
    loading: false,
    success: false,
    error: false,
    token: null,
    message: "",
  },
  reducers: {
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (bulder) => {
    bulder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.message = true;
        state.user = null;
        state.error = action.payload;
      })

      .addCase(signIn.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.message = true;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(getAllUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.error = null;
        state.success = true;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.message = true;
        state.users = null;
        state.error = payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
