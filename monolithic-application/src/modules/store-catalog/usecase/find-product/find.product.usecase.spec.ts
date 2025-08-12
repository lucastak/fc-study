import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find.product.usecase";

const product = new Product({
    id: new Id("123"),
    name: "Product 1",
    description: "Description of Product 1",
    salesPrice: 100,
});

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
    };
}

describe("FindProductUseCase Unit Tests", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = { id: product.id.id };
        const result = await usecase.execute(input);

        expect(productRepository.find).toHaveBeenCalledWith(product.id.id);
        expect(result.id).toBe(product.id.id);
        expect(result.name).toBe(product.name);
        expect(result.description).toBe(product.description);
        expect(result.salesPrice).toBe(product.salesPrice);
    });
});