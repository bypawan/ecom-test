import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { CartType, ProductType, UserType } from '@/constants/types';
import type { RootState } from '@/store/store';

const initialState: CartType = {
  users: [
    {
      products: [],
      totalQuantity: 0,
      totalPrice: 0,
      userId: 1,
    },
  ],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    createUserCart: (state, action: PayloadAction<UserType>) => {
      const userCart = state.users.find(
        (cart) => cart.userId === action.payload.id
      );

      if (userCart) return;

      state.users.push({
        products: [],
        totalQuantity: 0,
        totalPrice: 0,
        userId: action.payload.id,
      });
    },

    addProduct: (
      state,
      action: PayloadAction<{ userId: number; product: ProductType }>
    ) => {
      const { userId, product } = action.payload;
      const userCart = state.users.find((cart) => cart.userId === userId);

      if (!userCart) return;

      const existingProduct = userCart.products.find(
        (innerProduct) => innerProduct.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        userCart.products.push({ ...product, quantity: 1 });
      }

      userCart.totalQuantity += 1;
      userCart.totalPrice = Number(
        (userCart.totalPrice + product.price).toFixed(2)
      );
      userCart.userId = userId;
    },

    removeProduct: (
      state,
      action: PayloadAction<{ userId: number; product: ProductType }>
    ) => {
      const { userId, product } = action.payload;
      const userCart = state.users.find((cart) => cart.userId === userId);

      if (!userCart) return;

      userCart.products = userCart.products.filter(
        (innerProduct) => innerProduct.id !== product.id
      );
      userCart.totalPrice = Number(
        (userCart.totalPrice - product.price * product.quantity).toFixed(2)
      );
      userCart.totalQuantity -= 1;
    },

    increaseProductQuantity: (
      state,
      action: PayloadAction<{ userId: number; product: ProductType }>
    ) => {
      const { userId, product } = action.payload;
      const userCart = state.users.find((cart) => cart.userId === userId);

      if (!userCart) return;

      const existingProduct = userCart.products.find(
        (innerProduct) => innerProduct.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
        userCart.totalPrice = Number(
          (userCart.totalPrice + product.price).toFixed(2)
        );
      }
    },

    decreaseProductQuantity: (
      state,
      action: PayloadAction<{ userId: number; product: ProductType }>
    ) => {
      const { userId, product } = action.payload;
      const userCart = state.users.find((cart) => cart.userId === userId);

      if (!userCart) return;

      const existingProduct = userCart.products.find(
        (product) => product.id === product.id
      );

      if (!existingProduct) return;

      if (existingProduct.quantity === 1) {
        userCart.products = userCart.products.filter(
          (innerProduct) => innerProduct.id !== product.id
        );
        userCart.totalQuantity -= 1;
        userCart.totalPrice = Number(
          (userCart.totalPrice - existingProduct.price).toFixed(2)
        );
      } else {
        existingProduct.quantity -= 1;
        userCart.totalPrice = Number(
          (userCart.totalPrice - product.price).toFixed(2)
        );
      }
    },
  },
});

export const {
  addProduct,
  createUserCart,
  removeProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

export const addProductForSelectedUser =
  (product: ProductType) =>
  (
    dispatch: (arg0: {
      payload: { userId: number; product: ProductType };
      type: 'cart/addProduct';
    }) => void,
    getState: () => RootState
  ) => {
    const userId = getState().user.id;
    dispatch(addProduct({ userId, product }));
  };

export const removeProductForSelectedUser =
  (product: ProductType) =>
  (
    dispatch: (arg0: {
      payload: { userId: number; product: ProductType };
      type: 'cart/removeProduct';
    }) => void,
    getState: () => RootState
  ) => {
    const userId = getState().user.id;
    dispatch(removeProduct({ userId, product }));
  };

export const increaseProductQuantityForSelectedUser =
  (product: ProductType) =>
  (
    dispatch: (arg0: {
      payload: { userId: number; product: ProductType };
      type: 'cart/increaseProductQuantity';
    }) => void,
    getState: () => RootState
  ) => {
    const userId = getState().user.id;
    dispatch(increaseProductQuantity({ userId, product }));
  };

export const decreaseProductQuantityForSelectedUser =
  (product: ProductType) =>
  (
    dispatch: (arg0: {
      payload: { userId: number; product: ProductType };
      type: 'cart/decreaseProductQuantity';
    }) => void,
    getState: () => RootState
  ) => {
    const userId = getState().user.id;
    dispatch(decreaseProductQuantity({ userId, product }));
  };
