import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto, ProductAdmFacadeInterface} from "./product-adm.facade.interface"

export interface UseCaseProps{
    addUseCase: UseCaseInterface;
    stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addUseCase: UseCaseInterface;
    private _checkStockUseCase: UseCaseInterface;

    constructor(useCasesProps: UseCaseProps) {
        this._addUseCase = useCasesProps.addUseCase;
        this._checkStockUseCase = useCasesProps.stockUseCase;
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        return this._addUseCase.execute(input);
    }

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUseCase.execute(input);
    }
}