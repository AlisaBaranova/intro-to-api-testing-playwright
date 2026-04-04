import { z } from 'zod'

export class OrderDTO {
  status: string
  courierId: number
  customName: string
  customPhone: string
  comment: string
  id: number

  constructor(
    status: string,
    courierId: number,
    customName: string,
    customPhone: string,
    comment: string,
    id: number,
  ) {
    this.status = status
    this.courierId = courierId
    this.customName = customName
    this.customPhone = customPhone
    this.comment = comment
    this.id = id
  }
  static generateDefault(): OrderDTO {
    const Orderdto = new OrderDTO('OPEN', 0, 'string', 'string', 'string', 0)
    return Orderdto
  }
}

export const OrderSchema = z
  .object({
    status: z.string(),
    courierID: z.number().nullable(),
    customName: z.string(),
    customPhone: z.string(),
    comment: z.string(),
    id: z.number(),
  })
  .strict()

//export const OrderSchemaResponse
