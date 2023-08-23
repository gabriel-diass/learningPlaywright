import { test, expect } from "@playwright/test";

test.describe.parallel("api testing", () => {
  const baseURL = "https://jsonplaceholder.typicode.com/";
  test("simple api test - assert response status", async ({ request }) => {
    const response = await request.get(`${baseURL}todos/`);
    expect(response.status()).toBe(200);

    const responseBody = JSON.parse(await response.text());
  });

  test("simple api test - assert invalid status", async ({ request }) => {
    const response = await request.get(`${baseURL}fact123213`);
    expect(response.status()).toBe(404);
  });

  test.only('GET request - get one todo',async ({request}) => {
    const response = await request.get(`${baseURL}todos/1`);
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200)
     expect(responseBody.userId).toBe(1)
    console.log(responseBody)
    expect(responseBody.title).toBe('delectus aut autem')

  })
});
