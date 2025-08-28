import StoreCatalogeFacade from "../facade/store.catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find.product.usecase";

export default class StoreCatalogeFacadeFactory {
    static create(): StoreCatalogeFacade {
        const productRepository = new ProductRepository();
        const findUserCase = new FindProductUseCase(productRepository);
        const findAllUseCase = new FindAllProductsUseCase(productRepository);

        const facade = new StoreCatalogeFacade({
            findUseCase: findUserCase,
            findAllUseCase: findAllUseCase,
        });

        return facade;
    }
}