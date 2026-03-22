import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')

  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status, body and headers
  console.log('response body:', responseBody)
  // Check if the response status is 200
  expect(statusCode).toBe(200)
}) //OK

test('post order ID should receive code 201', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status and body
  console.log('response status:', statusCode)
  console.log('response body:', responseBody)
  expect(statusCode).toBe(StatusCodes.OK)
  // check that body.comment is string type
  expect(typeof responseBody.comment).toBe('string')
  // check that body.courierId is number type
  expect(typeof responseBody.courierId).toBe('number')
})//OK

test('get order ID should receive code 400', async ({ request }) => {
  const id = 'wrong'
  const response = await request.get(`https://backend.tallinn-learning.ee/test-orders/${id}`)
  const responseBody = await response.json()
  const statusCode = response.status()
  console.log('response body:', responseBody)
  expect(statusCode).toBe(400)
})//OK

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
})//OK

test('put order ID should receive code 400', async ({ request }) => {
  const orderId = '1'
  const response = await request.put(`https://backend.tallinn-learning.ee/test-orders/${orderId}`)
  const responseBody = await response.json()
  const statusCode = response.status()
  console.log('response status:', statusCode)
  console.log('response body:', responseBody)
  expect(statusCode).toBe(400)

})//OK

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
})//OK

test('delete order ID should receive code 204', async ({ request }) => {
  const orderId = '1'
  const requestHeaders = {
    api_key: '1234567890123456',
  }

  const response = await request.delete(`https://backend.tallinn-learning.ee/test-orders/${orderId}`, {
    headers: requestHeaders
  })

  const statusCode = response.status()
  console.log('response status:', statusCode)
  expect(statusCode).toBe(204)
})//OK

test('delete order ID should receive code 400', async ({ request }) => {
  const orderId = '0'
  const requestHeaders = {
    api_key: '1234567890123456',
  }

  const response = await request.delete(`https://backend.tallinn-learning.ee/test-orders/${orderId}`,{
    headers: requestHeaders,
  })

  const statusCode = response.status()
  console.log('response status:', statusCode)
  expect(statusCode).toBe(400)
})//OK

test('delete order ID should receive code 401', async ({ request }) => {
  const orderId = '1'
  const requestHeaders = {
    api_key: '0'
  }

  const response = await request.delete(`https://backend.tallinn-learning.ee/test-orders/${orderId}`, {
    headers: requestHeaders,
  })
  const statusCode = response.status()
  console.log('response status:', statusCode)
  expect(statusCode).toBe(401)
})//OK