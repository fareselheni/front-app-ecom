import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddProduct from '../../components/AddProduct';
import TableTwo from '../../components/TableTwo';

const AdminPanel = () => {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const showAdd = () => {
    setShow(!show);
  };
  const getProductList = async () => {
    await fetch('http://localhost:3000/product/products')
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  };
  // Callback function to update the product list
  const updateProductList = async () => {
    await getProductList();
  };
  useEffect(() => {
    getProductList();
  }, []);
  return (
    <>
      <div className="py-3">
        <Link
          onClick={showAdd}
          to="#"
          className="inline-flex items-center justify-center rounded-full bg-primary py-3 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-2"
        >
          New product
        </Link>
      </div>

      {show && products && <AddProduct updateProductList={updateProductList} products={products}/>}
      {products && products.length > 0 ? (
        <div className="py-6">
          <TableTwo productList={products} updateProductList={getProductList} />
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </>
  );
};

export default AdminPanel;
