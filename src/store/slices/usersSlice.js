import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    // "users/fetch/pending"과 같은 문자열을 직접 쓰는 대신,
    // 오타 발생 가능성을 줄이기 위해 비동기 액션 생성 함수인 fetchUsers에 .pending을 붙여 사용한다.
    builder.addCase(fetchUsers.pending, (state, action) => {
      // 데이터를 로딩 중임을 사용자에게 보여주기 위해 state 객체를 적절히 업데이트한다.
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      // Assumption: action.payload = [{id: 1, name: 'Maya'}] = what we fetch from the API.
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      // when error comes up, action 객체 안에서 error라는 키 네임의 객체가 생성됨. (payload가 아님!)
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;

// ✅ extraReducers: allows us to watch for some very particular/additional action types that are being dispatched that are not inherently tied to the slice. => 현재 슬라이스(slice)와 직접적으로 연관되지 않은 액션이라도, 그 액션 타입이 디스패치되었을 때 이를 감지하고 상태를 업데이트할 수 있도록 하는 기능을 제공한다.

// <역할 및 사용 이유>
// 1. 한 슬라이스가 아닌 여러 슬라이스에서 공통적으로 반응해야 하는 액션을 처리할 때 사용됩니다
// 2. createAsyncThunk로 생성된 비동기 작업의 pending, fulfilled, rejected 상태를 처리할 때 주로 사용됩니다.

// ✨ extraReducers(builder) 함수 ✨
// import { createAction } from "@reduxjs/toolkit";

// const reset = createAction("app/reset"); // 1️⃣ 액션객체 생성 함수

// 1️⃣ 액션객체 생성 함수 = reset
// extraReducers: (builder) => {
//   builder.addCase(reset, (state) => {
//     state.value = 0; // reset 액션 발생 시 상태 초기화
//   });

//  2️⃣ 액션 객체의 "타입"을 나타내는 값 = 'app/reset'
// builder.addCase(reset, (state) => {
//     state.value = 0; // reset 액션 발생 시 상태 초기화
//   });
// };

// builder.addCase()의 첫 번째 매개변수는 액션 객체 그 자체가 아니라, 1️⃣ "액션 생성 함수"(= 내부적으로는 reset 함수가 반환하는 type("app/reset")을 사용) 또는 2️⃣ 액션 객체의 "타입"을 나타내는 값(=직접 문자열 "app/reset"을 전달해도 동일하게 동작)입니다.
