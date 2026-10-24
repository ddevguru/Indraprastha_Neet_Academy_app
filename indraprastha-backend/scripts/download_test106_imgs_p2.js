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
    { name: 'q4176.jpg', url: 'https://drive.google.com/thumbnail?id=1DVc9W8TlWG41zq_6s7bJEuunHyVPs8jc&sz=w1000' },
    { name: 'q4189.jpg', url: 'https://drive.google.com/thumbnail?id=1RJNkRwICf7T0p2IJSnKFhQyVFe7QPFgk&sz=w1000' },
    { name: 'q4208.jpg', url: 'https://drive.google.com/thumbnail?id=1OjfiVOuxHJn3IFugOiW52PdDgxnqudw6&sz=w1000' },
    { name: 'q4209.jpg', url: 'https://drive.google.com/thumbnail?id=1seHMro6pQe_gwO_jfSEnwDW8opD0jAOY&sz=w1000' },
    { name: 'q4210.jpg', url: 'https://drive.google.com/thumbnail?id=1xOByMdr1xNN1K5WQEQAXKEQPz3kvF-jn&sz=w1000' },
    { name: 'q4211.jpg', url: 'https://drive.google.com/thumbnail?id=1_WjulDNwiTQKtA4bV-svbAj8-DK3vM6k&sz=w1000' },
    { name: 'q4212.jpg', url: 'https://drive.google.com/thumbnail?id=1dqpAMABXIRtodnxp5tfwNGBHBbJN5Z3q&sz=w1000' },
    { name: 'q4213.jpg', url: 'https://drive.google.com/thumbnail?id=1tCD7wBu9-Wj8nru5vdElcN0At3vnIAx3&sz=w1000' },
    { name: 'q4214.jpg', url: 'https://drive.google.com/thumbnail?id=1KltJcYvr7F2J490JJbjlDBytBoYPtHDA&sz=w1000' },
    { name: 'q4215.jpg', url: 'https://drive.google.com/thumbnail?id=1iv7_gvU1AA0MU0PTVHUKSk8n_r_0BT6f&sz=w1000' },
    { name: 'q4218.jpg', url: 'https://drive.google.com/thumbnail?id=1Tsem7pUQhnq2zIIIIQIvBYECcMv-yd5c&sz=w1000' }
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
