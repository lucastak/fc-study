import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.usecase.dto";

export default class FindClienteUseCase {
    private _clienteRepository: ClientGateway;

    constructor(clienteRepository: ClientGateway) {
        this._clienteRepository = clienteRepository;
    }

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
        const props = {
            id: input.id
        }

        const client = await this._clienteRepository.find(props.id);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        }
    }
}