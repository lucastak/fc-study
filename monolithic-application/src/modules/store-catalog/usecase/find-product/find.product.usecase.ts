import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { FindProductOutputDto } from "./find-product.dto";

export default class FindProductUseCase implements UseCaseInterface {
    private productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this.productRepository = productRepository;
    }

    async execute(input: { id: string }): Promise<FindProductOutputDto> {
        const product = await this.productRepository.find(input.id);
        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        };
    }
}