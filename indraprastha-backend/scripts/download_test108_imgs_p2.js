const https = require('https');
const fs = require('fs');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', reject);
  });
}

async function run() {
  const images = [
    { name: 'q4271.jpg', url: 'https://drive.google.com/thumbnail?id=1-YUDrWAnYIRJ_9GuWF35zdvyIkidWRUy&sz=w1000' },
    { name: 'q4272.jpg', url: 'https://drive.google.com/thumbnail?id=1pYFfjWADAFIWItuEJOhHObdyiMR6-QsO&sz=w1000' },
    { name: 'q4273.jpg', url: 'https://drive.google.com/thumbnail?id=1bj45JqKxFycjEeCuwXrTD1NXHcG1R2Hg&sz=w1000' },
    { name: 'q4274.jpg', url: 'https://drive.google.com/thumbnail?id=1T_3KaCu3PsaolwcbRUolAPzF8MjKFCgc&sz=w1000' },
    { name: 'q4276.jpg', url: 'https://drive.google.com/thumbnail?id=1fC4tUb4XDaVC_J_TbP-ajmmJNzxeCozC&sz=w1000' },
    { name: 'q4278.jpg', url: 'https://drive.google.com/thumbnail?id=12cnGbkZpEBbjepVESSd-YnkuXeofSqn7&sz=w1000' },
    { name: 'q4280.jpg', url: 'https://drive.google.com/thumbnail?id=1vFf4dz9tUrnLOvTIlz5dOYE1EkwXXYFL&sz=w1000' },
    { name: 'q4293.jpg', url: 'https://drive.google.com/thumbnail?id=1z9E9OmcjxQtYndfo5rEQH0TiOQHmfw0m&sz=w1000' },
    { name: 'q4294.jpg', url: 'https://drive.google.com/thumbnail?id=1J5WCx3u0tKQmkdwbprq0owbF4QanPQqS&sz=w1000' },
    { name: 'q4295.jpg', url: 'https://drive.google.com/thumbnail?id=1mJN4GEza9G_kI_Zoegs73hIW19s8okvr&sz=w1000' },
    { name: 'q4296.jpg', url: 'https://drive.google.com/thumbnail?id=1Ku5rUbrkTxhWiOOyswxDZPD8CL7lO1-W&sz=w1000' }
  ];

  for (const img of images) {
    try {
      await download(img.url, img.name);
      console.log('Downloaded', img.name, fs.statSync(img.name).size, 'bytes');
    } catch(e) {
      console.error('Error downloading', img.name, e.message);
    }
  }
}

run();
