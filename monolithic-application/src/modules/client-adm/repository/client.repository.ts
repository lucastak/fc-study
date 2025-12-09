import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export default class ClientRepository implements ClientGateway {

    async add(client: Client): Promise<void> {
        throw new Error("Client not found");
    }

    async find(id: string): Promise<Client> {
        const cliente = await ClientModel.findOne({ where: { id: id } });

        if (!cliente) {
            throw new Error("Client not found");
        }

        return new Client({
            id: new Id(cliente.id),
            name: cliente.name,
            email: cliente.email,
            address: cliente.address,
            createdAt: cliente.createdAt,
            updatedAt: cliente.updatedAt,
        })
    }
    
}