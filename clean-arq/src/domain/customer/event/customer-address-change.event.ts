import Address from "../value-object/address";
import EventInterface from "../../@shared/event/event.interface";

type dataChangeAddressCustomer = {
  id: string,
  name: string,
  address: Address,
}

export default class CustomerAddressChangeEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: dataChangeAddressCustomer;

  constructor(eventData: dataChangeAddressCustomer) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }

  get dataAddress() {
    return this.eventData;
  }
}