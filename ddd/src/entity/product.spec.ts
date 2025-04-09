import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 10);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("1", "", 10);
    }).toThrowError("Name is required");
  });

  it("should throw error when price is less than or equal to 0", () => {
    expect(() => {
      new Product("1", "Product 1", 0);
    }).toThrowError("Price must be greater than zero");

    expect(() => {
      new Product("1", "Product 1", -10);
    }).toThrowError("Price must be greater than zero");
  });

  it("should create a product with valid parameters", () => {
    const product = new Product("1", "Product 1", 100);

    expect(product.id).toBe("1");
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(100);
  });

  it("should change the name of the product", () => {
    const product = new Product("1", "Product 1", 100);
    product.changeName("Updated Product");

    expect(product.name).toBe("Updated Product");
  });

  it("should throw error when changing name to empty", () => {
    const product = new Product("1", "Product 1", 100);

    expect(() => {
      product.changeName("");
    }).toThrowError("Name is required");
  });

  it("should change the price of the product", () => {
    const product = new Product("1", "Product 1", 100);
    product.changePrice(200);

    expect(product.price).toBe(200);
  });

  it("should throw error when changing price to less than or equal to 0", () => {
    const product = new Product("1", "Product 1", 100);

    expect(() => {
      product.changePrice(0);
    }).toThrowError("Price must be greater than zero");

    expect(() => {
      product.changePrice(-50);
    }).toThrowError("Price must be greater than zero");
  });
});
