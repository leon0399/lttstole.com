import productsData from './products.json';

export type Product = {
  url: string;
}

export type Products = Record<string, Product>;

const products = productsData as Products;

export default products;
