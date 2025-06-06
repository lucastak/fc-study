import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      sequelize.addModels([CustomerModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("should find a customer", async () => {
        const customerRepositoyry = new CustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepositoyry)

        const customer = new Customer("123", "John Doe");
        const address = new Address("Street", 123, "Zip 123", "City 1");
        customer.changeAddress(address);

        await customerRepositoyry.create(customer);

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
})