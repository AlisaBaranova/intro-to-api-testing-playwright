import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { OrderDTO, OrderSchema } from '../src/dto/OrderDTO'
import { Login, LoginDTO } from '../src/dto/LoginDTO'
import { getJwt } from '../src/helpers/api-helpers'

const ORDERS_URL = 'https://backend.tallinn-learning.ee/orders'
const AUTH_URL = 'https://backend.tallinn-learning.ee/login/student'

test('post order with correct data should receive code 201', async ({ request }) => {
  const token = await getJwt(request)

  console.log('token' + token)
  const response = await request.post(ORDERS_URL, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    data: OrderDTO.generateDefault(),
  })
  const responseBody: OrderDTO = await response.json() //"age:20,title:'123'"
  const statusCode = response.status()

  console.log('response status:', statusCode)
  console.log('response body:', responseBody)
  expect(statusCode).toBe(StatusCodes.OK)
  const TestOrder = OrderSchema.parse(responseBody)
  expect(TestOrder.id).not.toBeUndefined()
})

test('get order with correct id should receive code 200', async ({ request }) => {
  const loginResponse = await request.post(AUTH_URL, {
    data: LoginDTO.generateCorrectPair(),
  })
  const token: Login = await loginResponse.text()

  const response = await request.post(ORDERS_URL, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    data: OrderDTO.generateDefault(),
  })
  const responseBody: OrderDTO = await response.json()

  const responseSearch = await request.get(`${ORDERS_URL}/${responseBody.id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })

  const responseBodySearch: OrderDTO = await responseSearch.json()
  const statusCode = responseSearch.status()
  expect(statusCode).toBe(StatusCodes.OK)
  const TestSearchOrder = OrderSchema.parse(responseBodySearch)
  expect(TestSearchOrder.id).not.toBeUndefined()
})

test('get order ID should receive code 400', async ({ request }) => {
  const id = 'wrong'
  const response = await request.get(`https://backend.tallinn-learning.ee/test-orders/${id}`)
  const responseBody = await response.json()
  const statusCode = response.status()
  console.log('response body:', responseBody)
  expect(statusCode).toBe(400)
}) //OK

test('put order ID should receive code 200', async ({ request }) => {
  const orderId = '1'
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const newOrder = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }

  const response = await request.put(`https://backend.tallinn-learning.ee/test-orders/${orderId}`, {
    headers: requestHeaders,
    data: newOrder,
  })
  const responseBody = await response.json()
  const statusCode = response.status()
  console.log('response status:', statusCode)
  console.log('response body:', responseBody)
  expect(statusCode).toBe(200)
}) //OK

test('put order ID should receive code 400', async ({ request }) => {
  const orderId = '1'
  const response = await request.put(`https://backend.tallinn-learning.ee/test-orders/${orderId}`)
  const responseBody = await response.json()
  const statusCode = response.status()
  console.log('response status:', statusCode)
  console.log('response body:', responseBody)
  expect(statusCode).toBe(400)
}) //OK

test('put order ID should receive code 401', async ({ request }) => {
  const orderId = '1'

  const requestHeaders = {
    api_key: '123456789012345',
  }
  const newOrder = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }

  const response = await request.put(`https://backend.tallinn-learning.ee/test-orders/${orderId}`, {
    headers: requestHeaders,
    data: newOrder,
  })

  const statusCode = response.status()
  console.log('response status:', statusCode)
  expect(statusCode).toBe(401)
}) //OK

test('delete order ID should receive code 204', async ({ request }) => {
  const orderId = '1'
  const requestHeaders = {
    api_key: '1234567890123456',
  }

  const response = await request.delete(
    `https://backend.tallinn-learning.ee/test-orders/${orderId}`,
    {
      headers: requestHeaders,
    },
  )

  const statusCode = response.status()
  console.log('response status:', statusCode)
  expect(statusCode).toBe(204)
}) //OK

test('delete order ID should receive code 400', async ({ request }) => {
  const orderId = '0'
  const requestHeaders = {
    api_key: '1234567890123456',
  }

  const response = await request.delete(
    `https://backend.tallinn-learning.ee/test-orders/${orderId}`,
    {
      headers: requestHeaders,
    },
  )

  const statusCode = response.status()
  console.log('response status:', statusCode)
  expect(statusCode).toBe(400)
}) //OK

test('delete order ID should receive code 401', async ({ request }) => {
  const orderId = '1'
  const requestHeaders = {
    api_key: '0',
  }

  const response = await request.delete(
    `https://backend.tallinn-learning.ee/test-orders/${orderId}`,
    {
      headers: requestHeaders,
    },
  )
  const statusCode = response.status()
  console.log('response status:', statusCode)
  expect(statusCode).toBe(401)
}) //OK