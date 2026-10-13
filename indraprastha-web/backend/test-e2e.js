const http = require('http');

function post(path, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function get(path, token) {
  return new Promise((resolve, reject) => {
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path,
      method: 'GET',
      headers,
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  console.log('--- 1. Health check ---');
  const health = await get('/api/health');
  console.log('Health:', health);

  console.log('\n--- 2. Batches list ---');
  const batches = await get('/api/auth/batches');
  console.log('Batches found:', batches.data.batches?.map(b => `${b.id}: ${b.name}`));

  console.log('\n--- 3. Student Login with phone 9123456789 ---');
  const login = await post('/api/auth/login', {
    phone: '9123456789',
    password: 'AdityaPassword@123'
  });
  console.log('Login status:', login.status);
  console.log('Login response:', {
    success: login.data.success,
    token: login.data.token ? 'JWT_TOKEN_RECEIVED' : null,
    user: login.data.user
  });

  if (login.data.token) {
    console.log('\n--- 4. Verify /me with Bearer token ---');
    const me = await get('/api/auth/me', login.data.token);
    console.log('/me status:', me.status);
    console.log('/me user profile:', me.data.user);
  }

  console.log('\n✅ ALL PostgreSQL ENDPOINT CHECKS COMPLETE!');
  process.exit(0);
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
