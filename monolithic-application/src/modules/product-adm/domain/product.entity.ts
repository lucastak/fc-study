import { AggregateRoot } from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
    id?: Id;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Product extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _purchasePrice: number;
    private _stock: number;
    private _description: string;

    constructor(props: ProductProps) {
        super(props.id);
        this._name = props.name;
        this._purchasePrice = props.purchasePrice;
        this._stock = props.stock;
        this._description = props.description;
    }

    get name(): string {
        return this._name;
    }

    get purchasePrice(): number {
        return this._purchasePrice;
    }

    get stock(): number {
        return this._stock;
    }

    get description(): string {
        return this._description;
    }

    set stock(value: number) {
        this._stock = value;
    }

    set description(value: string) {
        this._description = value;
    }

    set name(value: string) {
        this._name = value;
    }

    set purchasePrice(value: number) {
        this._purchasePrice = value;
    }
}