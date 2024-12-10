import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { albumsApi } from "./apis/albumsApi";

export const store = configureStore({
  reducer: {
    users: usersReducer, // usersSlice에서 정의된 usersReducer를 추가
    [albumsApi.reducerPath]: albumsApi.reducer,
    // 'albums'라는 키를 사용하여 albumsApi의 reducer를 추가해도 동일하게 동작할 것.. 하지만 오타 발생 가능성이 있기 때문에, 이런 식으로 임포트한 Api를 이용하자.
    // 'albums'이라는 reducerPath으로 albumsApi를 만들었기 때문에...=> API가 만약 store안의 자신이 관리하는 state를 보고싶을 땐, albums라는 키를 가진 value를 들여다볼 것..
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(albumsApi.middleware);
  },
});

setupListeners(store.dispatch);

// ✅ 5. Export the thunk from the store/index.js file
// The only reason we're doing this, remember if we allow our components to import from individual files inside the store, we just end up with some really, really messy components.
// 따라서, store/index.js를 "central export point" for everything related to redux로 만들기 위해 다음 코드를 써줄 것이다!
export * from "./thunks/fetchUsers";
// === fetchUsers에 있는 모든 코드와 더불어, index.js에 있는 코드까지 다 export한다는 뜻...

export * from "./thunks/addUser";
export * from "./thunks/removeUser";
export { useFetchAlbumsQuery, useAddAlbumMutation } from "./apis/albumsApi";
