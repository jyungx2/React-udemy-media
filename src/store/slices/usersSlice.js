import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";
import { removeUser } from "../thunks/removeUser";

// 이 usersSlice는 reducers 속성이 아닌, extraReducers만을 활용할 것이다. => 왜?
const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  // The goal of extraReducers is to allow us to watch for some additional action types. To watch for actions that are being dispatched that are not inherently tied to the slice. => ✨action type: pending/fulfilled/rejected✨
  extraReducers(builder) {
    // "users/fetch/pending"(action obj의 type속성값과의 비교대상.. 매치되면 호출되고, 그렇지 않으면 호출 안됨!)과 같은 문자열을 직접 쓰는 대신,
    // 오타 발생 가능성을 줄이기 위해 비동기 액션 생성 함수(action creator)인 fetchUsers에 .pending을 붙여 사용한다.
    builder.addCase(fetchUsers.pending, (state, action) => {
      // 데이터를 로딩 중임을 사용자에게 보여주기 위해 state 객체를 적절히 업데이트한다.
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      // (💥가정이 아닌 FACT💥 => AsyncThunks의 내부적인 세팅)
      // action.payload = [{id: 1, name: 'Maya'}] = This is what we fetch from the API.
      // fetchUsers(AsyncThunk)로부터 리턴받은 우리가 사용할 데이터(response.data)는 ✨자동으로✨ fulfilled action의 ✨payload 속성값으로 설정✨되기 때문에, 우리는 액션 객체의 payload값을 state.data로 설정해야 함!
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      // (💥가정이 아닌 FACT💥)
      // 데이터 요청에 실패하면, error 객체가 ✨자동으로✨ 생성되고, 이 객체는 payload가 아닌, ✨error라는 키 네임의 속성값✨으로 설정된다.
      // 즉, 액션 객체는 type, error 이렇게 두가지 키 값을 가지게 되고, 우리는 이 error(key)에 해당하는 밸류(객체)를 사용할 것.
      state.error = action.error;
    });

    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });

    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });

    builder.addCase(removeUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.isLoading = false;
      // FIX ME!!!
      console.log(action);
    });

    builder.addCase(removeUser.rejected, (state, action) => {
      state.isLoading = false;
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
