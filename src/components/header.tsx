import { useSelector } from 'react-redux';

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useGetUsersQuery } from '@/services/users';
import type { UserType } from '@/constants/types';
import { selectUser } from '@/features/cart/userSlice';
import {
  createUserCart,
  decreaseProductQuantityForSelectedUser,
  increaseProductQuantityForSelectedUser,
  removeProductForSelectedUser,
} from '@/features/cart/cartSlice';
import { useDispatch } from '@/hooks/useDispatch';

export const Header = () => {
  const dispatch = useDispatch();

  const selectedUserId = useSelector((state: RootState) => state.user.id);
  const cart = useSelector((state: RootState) =>
    state.cart.users.find((cart) => cart.userId === selectedUserId)
  );

  const { data: users, isLoading } = useGetUsersQuery({});

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  console.log(cart);

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
              <Button
                onClick={() => {
                  dispatch(selectUser(user));
                  dispatch(createUserCart(user));
                }}
              >
                Select
              </Button>
            </div>
          ))}
        </PopoverContent>
      </Popover>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button>Cart {cart?.products.length}</Button>
        </DrawerTrigger>
        <DrawerContent className="overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Your shopping cart</DrawerTitle>
          </DrawerHeader>
          {cart?.products && cart.products.length > 0 ? (
            cart?.products.map((product) => (
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
                      onClick={() =>
                        dispatch(
                          decreaseProductQuantityForSelectedUser(product)
                        )
                      }
                    >
                      {'-'}
                    </Button>
                    <span>{product.quantity}</span>
                    <Button
                      size="sm"
                      onClick={() =>
                        dispatch(
                          increaseProductQuantityForSelectedUser(product)
                        )
                      }
                    >
                      {'+'}
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      dispatch(removeProductForSelectedUser(product))
                    }
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
              Total Price: {cart?.totalPrice}
            </DrawerDescription>
            <DrawerDescription className="p-3">
              Total Quantity: {cart?.totalQuantity}
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
