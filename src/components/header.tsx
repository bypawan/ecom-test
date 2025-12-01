import { useDispatch, useSelector } from 'react-redux';

import { Button } from './ui/button';
import type { RootState } from '@/store/store';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProduct,
} from '@/features/cart/cartSlice';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useGetUsersQuery } from '@/services/users';
import type { UserType } from '@/constants/types';

export const Header = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);

  const { data: users, isLoading } = useGetUsersQuery({});

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  console.log(users);

  return (
    <header className="p-5 flex justify-between">
      <h1>App</h1>
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent className="max-h-60 overflow-y-scroll">
          {users.map((user: UserType) => (
            <div className="mb-5 flex items-center gap-5" key={user.id}>
              <img
                src={user.avatar}
                alt={user.name}
                className="h-10 w-10 object-cover rounded-full"
              />
              <h1>{user.name}</h1>
            </div>
          ))}
        </PopoverContent>
      </Popover>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button>Cart {cart.products.length}</Button>
        </DrawerTrigger>
        <DrawerContent className="overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Your shopping cart</DrawerTitle>
          </DrawerHeader>
          {cart.products.length > 0 ? (
            cart.products.map((product) => (
              <Card
                className="grid grid-cols-4 w-full mb-4 items-center gap-4 m-2 p-3"
                key={product.id}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-16 w-16 object-cover rounded"
                />
                <div className="col-start-2 -col-end-1">
                  <CardHeader>
                    <CardTitle>{product.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      ₹
                      {Number(product.quantity) *
                        Number(product.price.toFixed(2))}
                    </p>
                  </CardContent>
                </div>
                <CardFooter className="flex flex-col gap-2 col-start-1 -col-end-1">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => dispatch(decreaseProductQuantity(product))}
                    >
                      {'-'}
                    </Button>
                    <span>{product.quantity}</span>
                    <Button
                      size="sm"
                      onClick={() => dispatch(increaseProductQuantity(product))}
                    >
                      {'+'}
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => dispatch(removeProduct(product))}
                  >
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <DrawerDescription className="p-3">
              No products to show add some products first.
            </DrawerDescription>
          )}
          <DrawerFooter>
            <DrawerDescription className="p-3">
              Total Price: {cart.totalPrice}
            </DrawerDescription>
            <DrawerDescription className="p-3">
              Total Quantity: {cart.totalQuantity}
            </DrawerDescription>
            <Button>Proceed to payment</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </header>
  );
};
