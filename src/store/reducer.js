import { createSlice } from "@reduxjs/toolkit";
export const reducer = createSlice({
  name: "appReducer",
  initialState: {
    isLogged: false,
    user: {},
  },

  reducers: {
    setLogged: (state) => {
      state.isLogged = true;
    },
    setInitialLogged: (state) => {
      state.isLogged = false;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});
export const { setLogged, setUser, setInitialLogged } = reducer.actions;

export default reducer.reducer;
