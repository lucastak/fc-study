import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

//relacao - ID
let customer = new Customer("1", "John Doe");
const address = new Address("Street 1", 123, "123453-123", "City");
customer.Address = address;
customer.activate();


//eelacao Objeto - Entidade
const item1 = new OrderItem("1", "Item 1", 10, 2, "p1");
const item2 = new OrderItem("2", "Item 2", 15, 3, "p2");
const order = new Order("1", customer.id, [item1, item2]);