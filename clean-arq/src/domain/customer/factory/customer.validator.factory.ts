import ValidatorInterface from "../../validator/valitador.interface";
import Customer from "../entity/customer";
import CustomerYupValidator from "../validator/customer.yup.validator";

export default class CustomerValidatorFactory {
  static createValidator(): ValidatorInterface<Customer> {
    return new CustomerYupValidator();
  }
}