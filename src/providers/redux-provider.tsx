'use client';

import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/stores';
import type { PropsWithChildrenType } from '@/interfaces';

let store: AppStore | undefined;

const getStore = () => {
  if (!store) {
    store = makeStore();
  }
  return store;
}

export function ReduxProvider({ children }: PropsWithChildrenType) {
  return <Provider store={getStore()}>{children}</Provider>;
}

