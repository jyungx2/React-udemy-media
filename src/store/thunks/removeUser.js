import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk("users/remove", async (user) => {
  // DELETE 요청으로 유저 삭제
  await axios.delete(`http://localhost:3005/users/${user.id}`);

  // FIX!!!
  // 🪄 389. Fixing a Delete User
  // return response.data; // DELETE 요청의 서버 응답은 기본적으로 빈 객체를 반환. (response.data = {}).

  // 🛠️ Fixing Delete User: 이유 설명
  // 위의 리턴 코드는 어떤 유저를 삭제해야 하는지에 대한 정보가 아예 없다.
  // 그러나 Fulfilled 리듀서에서 삭제하려는 유저 ID를 활용해야 하므로,
  // 서버 응답을 그대로 반환하지 않고, 삭제 대상 유저 객체(user)를 반환
  // => 따라서 이 경우에는, get/post방식의 요청처럼 무작정 data를 받아오는 것이 아닌, user 오브젝트를 반환하도록 하여, user의 id를 action.payload.id와 비교하여 Filter method를 이용해 새로운 배열을 반환하도록 하여 업데이트하자!
  return user; // 삭제 대상 유저 객체 반환
});

export { removeUser };
