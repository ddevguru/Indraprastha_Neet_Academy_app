const { Client } = require('pg');

async function main() {
  const adminClient = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    database: 'postgres',
  });

  await adminClient.connect();
  console.log('Connected to PostgreSQL as postgres');

  // Check if role neetadmin exists
  const roleRes = await adminClient.query("SELECT 1 FROM pg_roles WHERE rolname = 'neetadmin'");
  if (roleRes.rows.length === 0) {
    await adminClient.query("CREATE ROLE neetadmin WITH LOGIN PASSWORD 'Indraprastha@123' SUPERUSER CREATEDB");
    console.log("Created role 'neetadmin' with password 'Indraprastha@123'");
  } else {
    await adminClient.query("ALTER ROLE neetadmin WITH LOGIN PASSWORD 'Indraprastha@123' SUPERUSER CREATEDB");
    console.log("Updated role 'neetadmin' password to 'Indraprastha@123'");
  }

  // Check if database indraprastha_db exists
  const dbRes = await adminClient.query("SELECT 1 FROM pg_database WHERE datname = 'indraprastha_db'");
  if (dbRes.rows.length === 0) {
    await adminClient.query("CREATE DATABASE indraprastha_db OWNER neetadmin");
    console.log("Created database 'indraprastha_db' with owner 'neetadmin'");
  } else {
    console.log("Database 'indraprastha_db' already exists");
  }

  await adminClient.end();
  console.log('PostgreSQL initialization completed successfully!');
}

main().catch((err) => {
  console.error('Database initialization error:', err);
  process.exit(1);
});
