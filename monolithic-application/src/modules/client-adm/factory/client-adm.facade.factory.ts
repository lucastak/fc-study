import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.repository";
import AddClienteUseCase from "../use-case/add-client/add-client.usecase";
import FindClienteUseCase from "../use-case/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
    static create(){
        const reposity = new ClientRepository();
        const addUsecase = new AddClienteUseCase(reposity);
        const findUsecase = new FindClienteUseCase(reposity);
        const facade = new ClientAdmFacade({
            addUsecase: addUsecase,
            findUsecase: findUsecase
        });

        return facade;
    }
}