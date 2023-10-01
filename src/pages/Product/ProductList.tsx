import { useEffect, useState } from 'react';
import Product from '../../components/Product';
const ProductList = () => {
  const [country, setCountry] = useState('');
  const [products, setProducts] = useState([]);

  const getUserGeolocationDetails = async () => {
    await fetch(
      'https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572',
    )
      .then((response) => response.json())
      .then((data) => setCountry(data.country_code));
  };
  const getProductList = async () => {
    await fetch('http://localhost:3000/product/products')
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  };
  useEffect(() => {
    getUserGeolocationDetails();
    getProductList();
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl  py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Products List
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {country && products && (
              <>
                {products.map((prod) => (
                  <Product country={country} product={prod} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
