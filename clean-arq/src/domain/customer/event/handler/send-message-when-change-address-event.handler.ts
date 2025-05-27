import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangeEvent from "../customer-address-change.event";

export default class SendMessageWhenChangeAddressEventHandler implements EventHandlerInterface<CustomerAddressChangeEvent> {

  handle(event: CustomerAddressChangeEvent): void {
    const { id, name, address } = event.dataAddress;

    console.log(`O cliente ${name} com o id: ${id} teve o seu endereço alterado para: ${address.toString()}`);
  }
}