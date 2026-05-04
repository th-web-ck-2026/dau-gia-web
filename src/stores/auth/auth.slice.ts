import { User } from '@/interfaces';
import { RootState } from '@/stores';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  email: string | null;
  otp: string | null;
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  email: null,
  otp: null,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },

    updateCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
    },

    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },

    clearAuth: (state) => {
      state.email = null;
      state.otp = null;
    },

    clearEmail(state) {
      state.email = null;
    },

    setOTP(state, action: PayloadAction<string>) {
      state.otp = action.payload;
    },

    clearOTP(state) {
      state.otp = null;
    },
  },
});

export const {
  setEmail,
  clearEmail,
  setOTP,
  clearOTP,
  clearAuth,
  setCredentials,
  updateCredentials,
  clearCredentials,
} = authSlice.actions;

export const selectUserInfo = (state: RootState) => state.auth.user;
export default authSlice.reducer;
