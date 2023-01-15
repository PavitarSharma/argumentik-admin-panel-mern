import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "../../utils/dataService";
const backendURL = "https://argumentik-abckend-nodejs.onrender.com";
const user = JSON.parse(localStorage.getItem("user"));

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
        localStorage.setItem("user", JSON.stringify(data.user));
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
      if (data) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
      }

      console.log(data);
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
  async (jsonData, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `${backendURL}/user/profile/${user._id}`,
        jsonData,
        {
          headers: authHeader(),
        }
      );

      console.log(data);

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
      const { data } = await axios.get(`${backendURL}/user`, {
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
    social: {}
  },
  reducers: {
    logout: (state, action) => {
      state.token = null;
    },

    socialLinks: (state, action) => {
      state.social = action.payload
    }
  },
  extraReducers: (bulder) => {
    bulder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
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
        state.user = action.payload.user;
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
        state.error = action.payload;
      })

      .addCase(updateSocialLinks.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateSocialLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.data.user;
      })
      .addCase(updateSocialLinks.rejected, (state, action) => {
        state.loading = false;
        state.message = true;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { logout, socialLinks } = userSlice.actions;

export default userSlice.reducer;
