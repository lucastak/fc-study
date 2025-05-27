import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "John Doe",
    address: {
        street: "Street",
        number: 123,
        zip: "Zip 123",
        city: "City 1"
    }
};

const MockRepository = () => {
    return {
        create: jest.fn().mockReturnValue(Promise.resolve(input)),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
    }
}

describe("Unit test create customer use case", () => {
    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const useCase = new CreateCustomerUseCase(customerRepository);

        const output = await useCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: "John Doe",
            address: {
                street: "Street",
                number: 123,
                zip: "Zip 123",
                city: "City 1"
            }
        });
    });
});