import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// name을 자동으로 만들어주는 라이브러리
import { faker } from "@faker-js/faker";

// 💥 name 필드는 프론트엔드에서 faker 라이브러리를 이용해 랜덤하게 생성되지만, id 필드는 서버에서 생성됨..
// 예를 들어, POST 요청으로 데이터를 추가하면 데이터베이스가 id를 자동으로 생성한 뒤, 생성된 데이터를 응답으로 반환
const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post("http://localhost:3005/users", {
    name: faker.name.fullName(), // name is being randomly generated.
  });

  return response.data; // 새롭게 생성된 유저 객체 반환 ..POST 요청의 응답으로 서버에서 생성된 데이터를 반환받는 방식이기 때문
});

export { addUser };
