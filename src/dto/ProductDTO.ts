export class ProductDTO {
  id: number
  name: string
  price: number
  createdAt: null | string

  constructor(id: number, name: string, price: number, createdAt: null | string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.createdAt = createdAt;
  }
  static generateDefault (): ProductDTO {
    return new ProductDTO(
      0,
      "test lesson 12",
      100,
      new Date().toISOString()
    )
  }
  static generateCustom (name: string, price: number): ProductDTO {
    return new ProductDTO(
      0,
      name,
      price,
      new Date().toISOString()
    )
  };
  static generateDefaultList (): ProductDTO [] {
    return [
      new ProductDTO(1, "A", 100, null ),
      new ProductDTO(2, "B", 200, null ),
      new ProductDTO(3, "C", 300, null ),
      ]
  };
}
