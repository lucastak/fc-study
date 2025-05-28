import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "John Doe",
    new Address(
        "Street",
        123,
        "Zip 123",
        "City 1"
    )
)

const input = {
    id: customer.id,
    name: "John Doe Updated",
    address: {
        street: "Street Updated",
        number: 456,
        zip: "Zip Updated",
        city: "City Updated"
    }
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for update customer use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);
        expect(output).toEqual(input);
    });
})