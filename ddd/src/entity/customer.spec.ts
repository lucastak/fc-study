import Customer from "./customer";
import Address from "./address";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "John");
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("123", "John");
    customer.changeName("Jane");
    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Street", 123, "12345-678", "City");
    customer.changeAddress(address);
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when trying to activate customer without address", () => {
    const customer = new Customer("123", "John");
    expect(() => {
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("123", "John");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("123", "John");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(20);
    expect(customer.rewardPoints).toBe(30);
  });

  it("should set and get address", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Main St", 123, "00000-000", "Townsville");
    customer.Address = address;

    expect(customer.Address).toBe(address);
  });
});
