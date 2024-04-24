import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../api/user";

export const asyncLogin = createAsyncThunk("user/login", async (data) => {
  const Response = await loginUser(data);
  return Response.data;
});

const user = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    userSave: (state, action) => {
      // 새로고침해도 로그인 정보 유지할수있게
      return action.payload;
    },
    userLogout: (state, action) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      const result = action.payload;

      return result;
    });
    builder.addCase(asyncLogin.rejected, (state, action) => {
      alert("회원 정보가 존재하지 않습니다.");
    });
  },
});
export default user;
export const { userSave, userLogout } = user.actions;
