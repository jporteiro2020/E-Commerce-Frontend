import { createSlice } from '@reduxjs/toolkit';

const stored = (() => {
  try {
    const token = localStorage.getItem('auth_token');
    const user  = localStorage.getItem('auth_user');
    if (token && user) return { token, user: JSON.parse(user), isAuthenticated: true };
  } catch (_) {}
  return { token: null, user: null, isAuthenticated: false };
})();

const authSlice = createSlice({
  name: 'auth',
  initialState: stored,
  reducers: {
    setCredentials(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser     = (state) => state.auth.user;
export const selectToken           = (state) => state.auth.token;

export default authSlice.reducer;
