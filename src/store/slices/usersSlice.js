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
    builder.addCase(fetchUsers.pending, (state, action) => {
      // Update our state object however appropriate
      // to show the user what we're loading data
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

// extraReducers: allows us to watch for some very particular/additional action types that are being dispatched that are not inherently tied to the slice.
