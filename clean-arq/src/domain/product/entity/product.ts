import Entity from "../../@shared/entity/entity.abstract";
import ProductInterface from "./product.interface";
import ProductValidatorFactory from "../factory/product.validator.factory";
import NotificationError from "../../@shared/notification/notification.error";

export default class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  changeProductName(name: string): void {
    this._name = name;
    this.validate();
  }

  get price(): number {
    return this._price;
  }

  changeProductPrice(price: number): void {
    this._price = price;
    this.validate();
  }

  validate(): boolean {
    ProductValidatorFactory.createValidator().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }

    return true;
  }
}