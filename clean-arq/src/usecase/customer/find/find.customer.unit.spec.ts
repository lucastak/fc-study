import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John Doe");
const address = new Address("Street", 123, "Zip 123", "City 1");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
    }
}

describe("Test find customer use case", () => {
    it("should find a customer", async () => {
        const customerRepositoyry = MockRepository();
        const useCase = new FindCustomerUseCase(customerRepositoyry)

        const input = {
            id: "123",
        };
        const output = await useCase.execute(input)
        expect(output).toEqual({
            id: "123",
            name: "John Doe",
            address: {
                street: "Street",
                number: 123,
                zip: "Zip 123",
                city: "City 1"
            }
        });
    })

    it("should not find a customer", async () => {
        const customerRepositoyry = MockRepository();
        customerRepositoyry.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });
        const useCase = new FindCustomerUseCase(customerRepositoyry)

        const input = {
            id: "999",
        };

        await expect(useCase.execute(input)).rejects.toThrow("Customer not found");
    });
})