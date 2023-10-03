export interface Product {
    title: string;
    category: string;
    description: string;
    image: string;
  }
export interface AddProductProps {
    updateProductList: any;
    products: Product[];
  }