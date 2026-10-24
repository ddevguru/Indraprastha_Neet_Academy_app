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
    { name: 'q4099.jpg', url: 'https://drive.google.com/thumbnail?id=1CY9xYBywHUkMjuieM1CmFMBVR1hB8qCD&sz=w1000' },
    { name: 'q4154.jpg', url: 'https://drive.google.com/thumbnail?id=1zFdN4QFOnhkghNTRkFg_2fZVVIYwr_fR&sz=w1000' },
    { name: 'q4164.jpg', url: 'https://drive.google.com/thumbnail?id=1RwKqC6xcLCbCRKTefNos8sRBNNEkyoRs&sz=w1000' },
    { name: 'q4165.jpg', url: 'https://drive.google.com/thumbnail?id=1OVwHd4seSaTjh2m3KrsZmj58RV2fHvFP&sz=w1000' },
    { name: 'q4170.jpg', url: 'https://drive.google.com/thumbnail?id=1xAt2KtiWu3TVHSkV38ur_irQHD-xvzOC&sz=w1000' },
    { name: 'q4174.jpg', url: 'https://drive.google.com/thumbnail?id=1l7ree-6wDIyNc60AMz5oLQipsvwlYrNe&sz=w1000' }
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
