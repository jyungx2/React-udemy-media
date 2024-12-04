import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// createAsyncThunk()의 첫번째 매개변수 = 자동으로 디스패치되는 ✨action 객체의 타입 속성의 접두사✨(= base 문자열)로 들어감
// => 이것이 usersSlice파일에서 fetchUsers.pending을 사용하는 것이 "users/fetch/pending"과 동일한 이유... (Redux Toolkit의 createAsyncThunk가 내부적으로 특정 규칙에 따라 액션 타입 문자열을 자동 생성하기 때문..)
// 여기서 'users/fetch'는 베이스 문자열로, 사실 아무거나 해도 되지만, 나중에 디버깅 처리를 위해 이해될 만한 스트링으로 지정!
const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("https://localhost:3005/users");
  // response.data = [{id: 1, name: 'myra'}]
  return response.data; // reducer에서 사용하고 싶은 데이터를 리턴
});

export { fetchUsers };

// 💥 createAction vs createAsyncThunk
// 1. createAction은 간단한 동기 액션 객체를 생성하는 데 사용.
// 2. createAsyncThunk는 비동기 함수 처리를 위해 설계된 도구.
