import pg from 'pg';

// Connect to the database
const connection_string = {
  connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
};
const client = new pg.Pool(connection_string);

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
client.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

await client.connect();

export const getJobs = async () => {
  try {
    const { rows } = await client.query('SELECT * FROM jobs');
    return rows;
  } catch (err) {
    console.error(err);
    await client.end();
  }
};

export const getJob = async (id) => {
  try {
    const { rows } = await client.query('SELECT * FROM jobs WHERE id = $1', [
      id,
    ]);
    return rows[0];
  } catch (err) {
    console.error(err);
    await client.end();
  }
};

export const getUsers = async () => {
  try {
    const { rows } = await client.query('SELECT * FROM users');
    return rows;
  } catch (err) {
    console.error(err);
    await client.end();
  }
};

export const getUser = async (id) => {
  try {
    const { rows } = await client.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    return rows[0];
  } catch (err) {
    console.error(err);
    await client.end();
  }
};

export const registerUser = async (newValues) => {
  try {
    const res = await client.query(
      'INSERT INTO users(username, password) VALUES($1, $2) RETURNING *',
      [newValues.username, newValues.password],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    await client.end();
  }
};

export const addJob = async (newValues) => {
  try {
    const res = await client.query(
      'INSERT INTO jobs(title, company, description) VALUES($1, $2, $3) RETURNING *',
      [newValues.title, newValues.company, newValues.description],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    await client.end();
  }
};
