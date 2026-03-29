import {StatusCodes} from 'http-status-codes'
import {expect, test} from '@playwright/test'
import {ProductDTO} from '../src/dto/ProductDTO'


test.describe ("Lesson 11 -> product API tests", () => {
  const BaseEndpointURL = 'https://backend.tallinn-learning.ee/products';
  const AUTH = {'X-API-Key': 'my-secret-api-key'};

  type ProductDTO = {
    id: number
    name: string
    price: number
    createdAt: null | string
  }
  test('GET/ products - check API returns array with length >=1', async ({request}) => {
    const response = await request.get(BaseEndpointURL, {
      headers: AUTH,
    });

    const responseBody: ProductDTO [] = await response.json();
    console.log (typeof responseBody);
    expect (response.status()).toBe(StatusCodes.OK);
    expect (responseBody.length).toBeDefined();
    expect (responseBody.length).toBeGreaterThanOrEqual(1);
  });

  test('GET/ products - check API not returns, invalid API key', async ({request}) => {
    const response = await request.get(BaseEndpointURL, {
      headers: { 'X-API-Key': 'my-secret-api-keyyy' },
    });
    const responseBody: ProductDTO[] = await response.json();
    console.log (typeof responseBody);
    expect (response.status()).toBe(StatusCodes.UNAUTHORIZED)
  });

  test('POST/ products; GET/products/{id} - check product creation and product search by ID', async ({ request }) => {
    const testProduct = ProductDTO.generateDefault()

    const createResponse = await request.post(BaseEndpointURL, {
      headers: AUTH,
      data: testProduct
    });

    const createResponseBody: ProductDTO = await createResponse.json();
    expect(createResponseBody.id).toBeGreaterThanOrEqual(0);
    expect(createResponseBody.name).toBe(testProduct.name);
    expect(createResponseBody.price).toBe(testProduct.price);
    expect(createResponseBody.createdAt).toBeDefined();

    const searchResponse = await request.get(`${BaseEndpointURL}/${createResponseBody.id}`, {
      headers: AUTH,
    });
    const searchResponseBody: ProductDTO = await searchResponse.json()
    expect.soft(searchResponseBody.id).toBe(createResponseBody.id);
    expect.soft(searchResponseBody.name).toBe(testProduct.name)
    expect.soft(searchResponseBody.price).toBe(testProduct.price)
    expect.soft(searchResponseBody.createdAt).toBeDefined()
  })

  test('DELETE/ products check not existing product deletion', async ({ request, }) => {

  const deleteResponse = await request.delete(`${BaseEndpointURL}/-1`, {
    headers: AUTH,
  })
  expect(deleteResponse.status()).toBe(400)
 });

  test('DELETE/ products; POST/ products - check existing product deletion', async ({ request }) => {
    const testProduct = ProductDTO.generateCustom("Fabric test", 1000);

    const createResponse = await request.post(BaseEndpointURL, {
      headers: AUTH,
      data: testProduct,
    })
    const createResponseBody: ProductDTO = await createResponse.json()
    const deleteResponse = await request.delete(`${BaseEndpointURL}/${createResponseBody.id}`, {
      headers: AUTH,
    })
    expect(deleteResponse.status()).toBe(204)
  })

  test('GET/products/{id} - check search for not existing product', async ( {request}) => {
    const getResponse = await request.get(`${BaseEndpointURL}/-1`, {
      headers: AUTH,
    });
    expect(getResponse.status()).toBe(400)
  });

  test('POST/products; GET/products - check all product creation and products search', async ({request}) => {

    const testProductList = ProductDTO.generateDefaultList()
    const createResponse = await request.post(BaseEndpointURL, {
      headers: AUTH,
      data: testProductList,
    })
    const createResponseBody: string = await createResponse.text()
    expect(createResponseBody.length).toBeDefined();

    const searchResponse = await request.get(BaseEndpointURL, {
      headers: AUTH,
    })
    const searchResponseBody: ProductDTO [] = await searchResponse.json()
    expect(searchResponseBody.length).toBeDefined();
    expect(testProductList).toBeInstanceOf(Array);









  })
})
