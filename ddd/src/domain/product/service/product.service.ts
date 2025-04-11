import Product from "../entity/product";

export default class ProductService {

  static increaseProductPrice(products: Product[], percentage: number): Product[] {
    products.forEach(product => {
      product.changeProductPrice((product.price * percentage / 100 + product.price));
    });

    return products;
  }
}