import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

// ✅ 5. Export the thunk from the store/index.js file
// The only reason we're doing this, remember if we allow our components to import from individual files inside the store, we just end up with some really, really messy components.
// 따라서, store/index.js를 "central export point" for everything related to redux로 만들기 위해 다음 코드를 써줄 것이다!
export * from "./thunks/fetchUsers";
// === fetchUsers에 있는 모든 코드와 더불어, index.js에 있는 코드까지 다 export한다는 뜻...
