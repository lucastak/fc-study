import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import {v4 as uuid} from "uuid";

export default class OrderService {
    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if(items.length === 0) {
            throw new Error("Items are required to place an order");
        }

        const order = new Order(uuid(), customer.id, items);
        customer.addRewardPoints(order.total() / 2);
        return order;
    }

    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => {
            return acc + order.total();
        }, 0);
    }
}