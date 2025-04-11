import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe('Customer factory unit test', () => {

  it('should create a customer', () => {
    const customer = CustomerFactory.create("Lucas");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Lucas");
    expect(customer.Address).toBeUndefined();
  });

  it('should create a customer with address', () => {

    const address = new Address("Rua teste", 2233, "2222-111", "Rio de Janeiro");
    const customer = CustomerFactory.createWithAddress("Lucas", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Lucas");
    expect(customer.Address).toBe(address);
  });
});