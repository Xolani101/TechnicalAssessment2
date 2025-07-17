require('dotenv').config();
const { test, expect, request } = require('@playwright/test');

test.describe('API Task Management', () => {
  let apiKey;
  let token;
  let taskId;

  test('Authenticate, create, verify, and update a task', async ({ page, request }) => {
    // Get API key from /signup page.
    await page.goto('https://reqres.in/signup');
    const apiKeyElement = await page.locator('h2.heading + pre.code').first();
    apiKey = (await apiKeyElement.textContent()).trim();
    expect(apiKey).toBeTruthy();

    /*// Authenticate and get JWT token.
    const loginRes = await request.post('https://reqres.in/api/login', {
      data: {
        email: process.env.API_USER_EMAIL,
        password: process.env.API_USER_PASSWORD
      },
      headers: {
        'x-api-key': apiKey
      }
    });
    expect(loginRes.ok()).toBeTruthy();
    token = (await loginRes.json()).token;
    expect(token).toBeTruthy();*/

    // Create a task.
    const createRes = await request.post('https://reqres.in/api/tasks', {
      data: {
        title: 'Automated API Task',
        completed: false
      },
      headers: {
        'x-api-key': apiKey
      }
    });
    expect(createRes.ok()).toBeTruthy();
    const createdTask = await createRes.json();
    taskId = createdTask.id;
    expect(taskId).toBeTruthy();

    // Verify task exists.
    const getRes = await request.post('https://reqres.in/api/tasks/${taskId}', {
      headers: {
        'x-api-key': apiKey
      }
    });
    expect(getRes.ok()).toBeTruthy();

    // Update the task’s completed status.
    const updateRes = await request.put(`https://reqres.in/api/tasks/${taskId}`, {
      data: {
        completed: true
      },
      headers: {
        'x-api-key': apiKey
      }
    });
    expect(updateRes.ok()).toBeTruthy();
    const updatedTask = await updateRes.json();
    expect(updatedTask.completed).toBe(true);
  });
});