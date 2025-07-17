require('dotenv').config();
const { Client } = require('pg');

async function main() {
  const client = new Client({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  });

  await client.connect();

  // Insert a new task
  const insertRes = await client.query(
    'INSERT INTO tasks (title, completed, user_id) VALUES ($1, $2, $3) RETURNING *',
    ['Automated DB Task', false, 1]
  );
  const task = insertRes.rows[0];
  console.log('Inserted:', task);

  // Verify the task exists
  const selectRes = await client.query('SELECT * FROM tasks WHERE id = $1', [task.id]);
  console.log('Selected:', selectRes.rows[0]);

  // Update the completed flag
  await client.query('UPDATE tasks SET completed = $1 WHERE id = $2', [true, task.id]);
  const updatedRes = await client.query('SELECT * FROM tasks WHERE id = $1', [task.id]);
  console.log('Updated:', updatedRes.rows[0]);

  await client.end();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
