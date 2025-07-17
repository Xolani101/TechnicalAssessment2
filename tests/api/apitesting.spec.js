require('dotenv').config();
const { test, expect, request } = require('@playwright/test');

test.describe('API Task Management', () => {
  let apiKey;
  let token;
  let taskId;

  test('Authenticate, create, verify, and update a task', async () => {
    // Get API key from /signup.
    const apiContext = await request.newContext();
    const signupRes = await apiContext.get('https://reqres.in/signup');
    expect(signupRes.ok()).toBeTruthy();
    apiKey = (await signupRes.json()).apiKey || signupRes.headers()['x-api-key'];
    expect(apiKey).toBeTruthy();

    // Authenticate and get JWT token.
    const loginRes = await apiContext.post('https://reqres.in/api/login', {
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
    expect(token).toBeTruthy();

    // Create a task.
    const createRes = await apiContext.post('https://reqres.in/api/tasks', {
      data: {
        title: 'Automated API Task',
        completed: false
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'x-api-key': apiKey
      }
    });
    expect(createRes.ok()).toBeTruthy();
    const createdTask = await createRes.json();
    taskId = createdTask.id;
    expect(taskId).toBeTruthy();

    // Verify task exists.
    const getRes = await apiContext.get('https://reqres.in/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
        'x-api-key': apiKey
      }
    });
    expect(getRes.ok()).toBeTruthy();
    const tasks = await getRes.json();
    const found = Array.isArray(tasks) ? tasks.find(t => t.id === taskId) : tasks.data.find(t => t.id === taskId);
    expect(found).toBeTruthy();

    // Update the task’s completed status.
    const updateRes = await apiContext.put(`https://reqres.in/api/tasks/${taskId}`, {
      data: {
        completed: true
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'x-api-key': apiKey
      }
    });
    expect(updateRes.ok()).toBeTruthy();
    const updatedTask = await updateRes.json();
    expect(updatedTask.completed).toBe(true);
  });
});