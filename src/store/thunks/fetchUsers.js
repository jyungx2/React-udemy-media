import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ⭐️Goal of createAsyncThunk is to ✨automatically✨ dispatch actions for us during the data loading process⭐️

// Async Thunk는 "비동기 요청"을 관리하는 함수로, "자동으로 액션을 디스패치"해서 ✨요청 상태에 따라✨ 상태(state)를 업데이트
// 1️⃣ 요청이 시작되면 Async Thunk가 pending 상태의 액션을 자동으로 디스패치.
// 2️⃣ 요청이 성공하면 Async Thunk가 fulfilled 상태의 액션을 디스패치.
// 3️⃣ 요청 중 에러가 발생하면 Async Thunk가 rejected 상태의 액션을 디스패치.

// ✅ Async Thunk는 비동기 요청의 상태 변화(pending, fulfilled, rejected)에 따라 ✨자동으로✨ 적절한 액션을 디스패치.

// 지금껏 그랬듯이 createAsyncThunk에 의해 만들어지는 action 객체 또한 type 속성을 가질 것인데, 첫번째 매개변수(users/fetch)가 타입 속성의 접두사(=> base type)로 들어간다.

// 💥usersSlice파일에서
// fetchUsers.pending === "users/fetch/pending"과 동일한 이유
// = Redux Toolkit의 createAsyncThunk가 내부적으로 "특정 규칙"에 따라 액션 타입 문자열을 자동 생성하기 때문...(그냥 일단 외우자 ㅎㅎ)

// 🚧🚧🚧 특정 규칙 🚧🚧🚧
// When you create this thing(fetchUsers), this fetchUsers variable right here is going to have three properties(pending/fulfilled/rejected) automatically assigned to it.
////////////////////////EXAMPLE//////////////////
// fetchUsers.pending === "users/fetch/pending";
// fetchUsers.pending === "users/fetch/pending";
// fetchUsers.pending === "users/fetch/pending"

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");

  // DEV ONLY!!
  // 개발 및 테스트 환경에서 의도적으로 지연 시간을 추가하고, 이를 비동기적으로 처리하려는 목적에서 사용
  await pause(1000);

  return response.data; // reducer에서 사용하고 싶은 데이터를 리턴 = [{id: 1, name: 'myra'}]
});

// DEV ONLY!! (helper function: pause)
const pause = (duration) => {
  // 💥 pause 함수에서 Promise를 반환한 이유는 비동기 흐름 제어를 위해 async/await를 사용하기 위해서이며, createAsyncThunk가 "무조건 비동기 작업만 처리해야 하기 때문"은 아니다.
  // ✍🏼 setTimeout 자체는 비동기적으로 동작하지만, setTimeout만으로는 await 키워드를 사용할 수 없다.
  // ✍🏼 따라서 pause는 setTimeout을 감싸는 Promise를 만들어, await 키워드로 호출할 수 있도록 구현된 것입니다.
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchUsers };

// 📝 Creating an Async Thunk
// 🏊‍♀️ Goal: fetch some data and automatically have some actions dispatched for us as we're fetching the data.
// 1️⃣ Create a new file for your thunk. Name it after the purpose of the request
// 2️⃣ Create the thunk. Give it a base type that describes the purpose of the request
// 3️⃣ In the thunk, make the request, return the data that you want to use in the reducer
// 4️⃣ In the slice, add extraReducers, watching for the action types made by the thunk
// 5️⃣ Export the thunk from the store/index.js file (= make index.js a central export point!)
// 6️⃣ When a user does something, dispatch the thunk function to run it.

// ✍🏼 createAction (동기적인 액션 생성) vs createAsyncThunk (비동기 작업 처리 및 상태 관리)
// 1. createAction은 간단한 동기 액션 객체를 생성하는 데 사용.
// 👉 1개의 액션 타입 생성
// 👉 Payload: 선택적으로 포함 가능
// 👉 Reducer와의 연결: reducers에서 주로 사용

// 2. createAsyncThunk는 비동기 함수(예: API 호출)를 처리하고, 해당 작업의 상태를 관리하는데 사용.
// 👉 3개의 액션 타입 생성 (pending/fulfilled/rejected)
// 👉 Payload: 비동기 작업의 결과 또는 에러 정보를 자동으로 포함
// 👉 Reducer와의 연결: extraReducers에서 주로 사용
