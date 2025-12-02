import type { UserType } from '@/constants/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: UserType = {
  id: 1,
  name: '',
  avatar: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<UserType>) => {
      state.id = action.payload.id;
    },
  },
});

export const { selectUser } = userSlice.actions;
export default userSlice.reducer;
