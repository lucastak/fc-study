import AddProductUsecase from "./add-product.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    }
}

describe("Add product usecase unit test", () => {
    it("should add a product", async () => {
        const productRepository = MockRepository();
        const usecase = new AddProductUsecase(productRepository);

        const input = {
            name: "Product 1",
            purchasePrice: 100,
            description: "Description of Product 1",
            stock: 50
        }

        const result = await usecase.execute(input);

        expect(productRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.description).toBe(input.description);
        expect(result.purchasePrice).toBe(input.purchasePrice);
        expect(result.stock).toBe(input.stock);
    });
})