import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";

export default class FindAllProductsUseCase implements UseCaseInterface {
    private productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this.productRepository = productRepository;
    }

    async execute(): Promise<{ products: { id: string; name: string; description: string; salesPrice: number }[] }> {
        const products = await this.productRepository.findAll();
        return {
            products: products.map((product) => ({
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
            })),
        };
    }
}