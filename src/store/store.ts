import { configureStore } from '@reduxjs/toolkit';

import { productApi } from '@/services/product';
import cartReducer from '@/features/cart/cartSlice';
import userReducer from '@/features/cart/userSlice';
import { userApi } from '@/services/users';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productApi.middleware, userApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
