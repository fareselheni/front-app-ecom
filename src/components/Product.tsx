import { useEffect, useState } from 'react';
interface TypeProductProps {
  _id: string;
  title: string;
  description: string;
  image: string;
}

interface ProductProps {
  country: string;
  product: TypeProductProps;
}
const Product = ({ country, product }: ProductProps) => {
  const [productPrice, setProductPrice] = useState();
  const getProductPrice = async () => {
    await fetch(
      `${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/price?productId=${product._id}&country=${country}`,
    )
      .then((response) => response.json())
      .then((data) => setProductPrice(data.price));
  };
  useEffect(() => {
    getProductPrice();
  }, []);
  return (
    <>
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={`${import.meta.env.VITE_APP_SERVER_BASE_URL}/images/${product.image}`}
            alt="Front of men&#039;s Basic Tee in black."
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          ></img>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" className="absolute inset-0"></span>
                {product?.title}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {product.description.length > 40
                ? `${product.description.substring(0, 50)}...`
                : product.description}
            </p>
          </div>
          <p className="text-sm font-medium text-gray-900">
            {productPrice ? productPrice : 'not available'}
          </p>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Product;
