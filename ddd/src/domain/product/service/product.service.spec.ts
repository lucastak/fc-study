import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {

  it("should change the prices of all products", () => {
    const product_01 = new Product("productId_01", "Mouse", 10);
    const product_02 = new Product("productId_02", "Keyboard", 20);
    const products = [product_01, product_02];

    ProductService.increaseProductPrice(products, 100);

    expect(product_01.price).toBe(20);
    expect(product_02.price).toBe(40);
  });
});