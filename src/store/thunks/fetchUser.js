import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// createAsyncThunk()의 매개변수 = 자동으로 디스패치되는 action 객체의 타입의 접두사로 들어갈 것 => 아무거나 해도 되지만, 나중에 디버깅 처리를 위해 이해될 만한 스트링으로 지정!
const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("https://localhost:3005/users");
  // response.data = [{id: 1, name: 'myra'}]
  return response.data; // reducer에서 사용하고 싶은 데이터를 리턴
});

export { fetchUsers };
