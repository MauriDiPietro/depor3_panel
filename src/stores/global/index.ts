import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createUserSlice, UserSlice } from './user.slice';
import { createNewsSlice, NewsSlice } from './news.slice';


type GlobalState = UserSlice & NewsSlice;

export const useGlobalStore = create<GlobalState>()(
  devtools((...a) => ({
    ...createUserSlice(...a),
    ...createNewsSlice(...a),
  })),
);
