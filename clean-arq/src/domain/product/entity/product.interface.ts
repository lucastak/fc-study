export default interface ProductInterface {
  get id(): string;
  get name(): string;
  get price(): number;
  changeProductName(name: string): void;
  changeProductPrice(price: number): void;
}