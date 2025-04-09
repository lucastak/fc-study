import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empity", () => {
        expect(() => {
            new Product("", "Product 1", 10);
        }).toThrowError("Id is required");
    });
})