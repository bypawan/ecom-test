import { useSelector } from 'react-redux';

import type { ProductType } from '@/constants/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import {
  addProductForSelectedUser,
  decreaseProductQuantityForSelectedUser,
  increaseProductQuantityForSelectedUser,
} from '@/features/cart/cartSlice';
import { useDispatch } from '@/hooks/useDispatch';
import type { RootState } from '@/store/store';

export const Product = ({ product }: { product: ProductType }) => {
  const dispatch = useDispatch();
  const selectedUserId = useSelector((state: RootState) => state.user.id);
  const existingProduct = useSelector((state: RootState) =>
    state.cart.users
      .find((cart) => cart.userId === selectedUserId)
      ?.products.find((innerProduct) => innerProduct.id === product.id)
  );

  return (
    <Card className="overflow-hidden shadow-md">
      <img
        src={product.image}
        alt="Product"
        className="h-48 w-full object-cover"
      />
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{product.title}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold">₹{product.price}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        {existingProduct ? (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() =>
                dispatch(decreaseProductQuantityForSelectedUser(product))
              }
            >
              {'-'}
            </Button>
            <span>{existingProduct.quantity}</span>
            <Button
              size="sm"
              onClick={() =>
                dispatch(increaseProductQuantityForSelectedUser(product))
              }
            >
              {'+'}
            </Button>
          </div>
        ) : (
          <Button
            className="w-full"
            onClick={() => dispatch(addProductForSelectedUser(product))}
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
