import { useGetProductsQuery } from './services/product';
import { Spinner } from './components/ui/spinner';
import type { ProductType } from './constants/types';
import { Product } from './components/product';
import { Header } from './components/header';

import './App.css';

function App() {
  const { data: products, isLoading } = useGetProductsQuery({});

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <Spinner className="size-10" />
      </div>
    );
  }

  return (
    <section>
      <Header />
      <div className="grid grid-cols-3 gap-5 p-8">
        {products.length > 0 ? (
          products.map((product: ProductType) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <h1>No products to show.</h1>
        )}
      </div>
    </section>
  );
}

export default App;
