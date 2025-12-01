import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { CartType, ProductType } from '@/constants/types';

const initialState: CartType = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductType>) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
        state.totalQuantity += 1;
      }

      state.totalPrice = Number(
        (state.totalPrice + action.payload.price).toFixed(2)
      );
    },

    removeProduct: (state, action: PayloadAction<ProductType>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.totalPrice = Number(
        (
          state.totalPrice -
          action.payload.price * action.payload.quantity
        ).toFixed(2)
      );
      state.totalQuantity -= 1;
    },

    increaseProductQuantity: (state, action: PayloadAction<ProductType>) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
        state.totalPrice = Number(
          (state.totalPrice + action.payload.price).toFixed(2)
        );
      }
    },

    decreaseProductQuantity: (state, action: PayloadAction<ProductType>) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (!existingProduct) return;

      if (existingProduct.quantity === 1) {
        state.products = state.products.filter(
          (p) => p.id !== action.payload.id
        );
        state.totalQuantity -= 1;
        state.totalPrice = Number(
          (state.totalPrice - existingProduct.price).toFixed(2)
        );
      } else {
        existingProduct.quantity -= 1;
        state.totalPrice = Number(
          (state.totalPrice - action.payload.price).toFixed(2)
        );
      }
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
