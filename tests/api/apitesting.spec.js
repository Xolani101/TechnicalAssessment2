require('dotenv').config();
const { test, expect, request } = require('@playwright/test');

test.describe('API Task Management', () => {
  let apiKey;
  let token;
  let taskId;

  test('Get API key from signup page', async ({ page }) => {
    await page.goto('https://reqres.in/signup');
    const apiKeyElement = await page.locator('h2.heading + pre.code').first();
    apiKey = (await apiKeyElement.textContent()).trim();
    expect(apiKey).toBeTruthy();
    expect(apiKey).toBe('reqres-free-v1');
  });

  test('Authenticate and get JWT token', async ({ request }) => {
    const loginRes = await request.post('https://reqres.in/api/login', {
      data: {
        email: process.env.API_USER_EMAIL,
        password: process.env.API_USER_PASSWORD
      },
      headers: {
        'x-api-key': 'reqres-free-v1'
      }
    });
    expect(loginRes.ok()).toBeTruthy();
    token = (await loginRes.json()).token;
    expect(token).toBeTruthy();
  });

  test('Create a new task', async ({ request }) => {
    const createRes = await request.post('https://reqres.in/api/tasks', {
      data: {
        title: 'Automated API Task',
        completed: false
      },
      headers: {
        'x-api-key': 'reqres-free-v1'
      }
    });
    expect(createRes.ok()).toBeTruthy();
    const createdTask = await createRes.json();
    taskId = createdTask.id;
    expect(taskId).toBeTruthy();
  });

  test('Verify task exists', async ({ request }) => {
    const getRes = await request.put(`https://reqres.in/api/tasks/${taskId}`, {
      headers: {
        'x-api-key': 'reqres-free-v1'
      }
    });
    expect(getRes.ok()).toBeTruthy();
    const task = await getRes.json();
  });

  test('Update task completion status', async ({ request }) => {
    const updateRes = await request.put(`https://reqres.in/api/tasks/${taskId}`, {
      data: {
        completed: true
      },
      headers: {
        'x-api-key': 'reqres-free-v1'
      }
    });
    expect(updateRes.ok()).toBeTruthy();
    const updatedTask = await updateRes.json();
    expect(updatedTask.completed).toBe(true);
  });
});