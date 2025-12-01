import { useDispatch, useSelector } from 'react-redux';

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
  addProduct,
  decreaseProductQuantity,
  increaseProductQuantity,
} from '@/features/cart/cartSlice';
import type { RootState } from '@/store/store';

export const Product = ({ product }: { product: ProductType }) => {
  const dispatch = useDispatch();
  const existingProduct = useSelector((state: RootState) =>
    state.cart.products.find((innerProduct) => innerProduct.id === product.id)
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
              onClick={() => dispatch(decreaseProductQuantity(product))}
            >
              {'-'}
            </Button>
            <span>{existingProduct.quantity}</span>
            <Button
              size="sm"
              onClick={() => dispatch(increaseProductQuantity(product))}
            >
              {'+'}
            </Button>
          </div>
        ) : (
          <Button
            className="w-full"
            onClick={() => dispatch(addProduct(product))}
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
