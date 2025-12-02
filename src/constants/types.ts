export type ProductType = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

// export type CartType = {
//   products: ProductType[];
//   totalPrice: number;
//   totalQuantity: number;
// };

export type CartType = {
  users: {
    products: ProductType[];
    totalPrice: number;
    totalQuantity: number;
    userId: number;
  }[];
};

export type UserType = {
  id: number;
  name: string;
  avatar: string;
};
