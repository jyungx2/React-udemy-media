import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// name을 자동으로 만들어주는 라이브러리
import { faker } from "@faker-js/faker";

const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post("http://localhost:3005/users", {
    name: faker.name.fullName(), // name is being randomly generated.
  });

  return response.data;
});

export { addUser };
