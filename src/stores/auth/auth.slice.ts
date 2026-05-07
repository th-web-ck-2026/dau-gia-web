import { User } from '@/interfaces/auth';
import { RootState } from '@/stores';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  email: string | null;
  otp: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  email: null,
  otp: null,
  user: null,
  isAuthenticated: false,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    clearCredentials: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.email = null;
      state.otp = null;
    },

    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },

    setOTP(state, action: PayloadAction<string>) {
      state.otp = action.payload;
    },

    clearAuthTempData: (state) => {
      state.email = null;
      state.otp = null;
    },
  },
});

export const {
  setEmail,
  setOTP,
  setCredentials,
  clearCredentials,
  clearAuthTempData,
} = authSlice.actions;


export const selectUserInfo = (state: RootState) => state.auth.user;
export default authSlice.reducer;
