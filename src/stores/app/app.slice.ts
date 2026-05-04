import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCALE } from '@/constants';

interface AppState {
  loading: boolean;
  locale: LOCALE;
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
}

const initialState: AppState = {
  loading: false,
  locale: LOCALE.VI,
  theme: 'system',
  sidebarCollapsed: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLocale: (state, action: PayloadAction<LOCALE>) => {
      state.locale = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
  },
});

export const { setLoading, setLocale, setTheme, toggleSidebar, setSidebarCollapsed } = appSlice.actions;
export default appSlice.reducer;

