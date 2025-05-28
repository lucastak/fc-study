export interface InputCreateProductDto {
  type: string;
  name: string;
  price: number;
}

export interface OutputProductDto {
  id: string;
  name: string;
  price: number;
}