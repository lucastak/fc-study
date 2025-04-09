import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("123", "", []);
    }).toThrowError("Customer id is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      new Order("123", "123", []);
    }).toThrowError("Items are required");
  });

  it("should throw error when item id is empty", () => {
    const orderItem = new OrderItem("", "Item 1", 10, 1, "p1");
    expect(() => {
      new Order("123", "123", [orderItem]);
    }).toThrowError("Item id is required");
  });

  it("should throw error when item name is empty", () => {
    const orderItem = new OrderItem("1", "", 10, 1, "p1");
    expect(() => {
      new Order("123", "123", [orderItem]);
    }).toThrowError("Item name is required");
  });

  it("should throw error when item price is zero or negative", () => {
    const item1 = new OrderItem("1", "Item 1", 0, 1, "p1");
    const item2 = new OrderItem("2", "Item 2", -10, 1, "p2");

    expect(() => new Order("123", "123", [item1])).toThrowError(
      "Item price must be greater than zero"
    );
    expect(() => new Order("123", "123", [item2])).toThrowError(
      "Item price must be greater than zero"
    );
  });

  it("should throw error when item quantity is zero or negative", () => {
    const item1 = new OrderItem("1", "Item 1", 10, 0, "p1");
    const item2 = new OrderItem("2", "Item 2", 15, -2, "p2");

    expect(() => new Order("123", "123", [item1])).toThrowError(
      "Item quantity must be greater than zero"
    );
    expect(() => new Order("123", "123", [item2])).toThrowError(
      "Item quantity must be greater than zero"
    );
  });

  it("should calculate the total price of the order correctly with quantity", () => {
    const item1 = new OrderItem("1", "Item 1", 10, 2, "p1");
    const item2 = new OrderItem("2", "Item 2", 15, 3, "p2");
    const order = new Order("123", "123", [item1, item2]);

    expect(order.total()).toBe(65);
  });
});
