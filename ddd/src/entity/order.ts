import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._items = items;
    this._id = id;
    this._customerId = customerId;
    this.validate();
    this._total = this.total();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._customerId.length === 0) {
      throw new Error("Customer id is required");
    }
    if (this._items.length === 0) {
      throw new Error("Items are required");
    }
    this._items.forEach((item) => {
      if (item._id.length === 0) {
        throw new Error("Item id is required");
      }
      if (item._name.length === 0) {
        throw new Error("Item name is required");
      }
      if (item._price <= 0) {
        throw new Error("Item price must be greater than zero");
      }
      if (item._quantity <= 0) {
        throw new Error("Item quantity must be greater than zero");
      }
    });

    return true;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item._price * item._quantity, 0);
  }
}
