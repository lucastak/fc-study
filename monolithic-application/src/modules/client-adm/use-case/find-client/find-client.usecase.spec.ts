import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import FindClienteUseCase from "./find-client.usecase";

const cliente = new Client({
    id: new Id("1"),
    name: "Client 1",
    email: "x@x.com",
    address: "Address 1"
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(cliente)),
    };
};


describe("Find Client Use Case unit test", () => {
    it("should find a client", async () => {
        const repository = MockRepository();
        const usecase = new FindClienteUseCase(repository);

        const input = {
            id: "1"
        };

        const result = await usecase.execute(input);
        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(cliente.name);
        expect(result.email).toEqual(cliente.email);
        expect(result.address).toEqual(cliente.address);
        expect(result.createdAt).toEqual(cliente.createdAt);
        expect(result.updatedAt).toEqual(cliente.updatedAt);
    });
});