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
    { name: 'q4219.jpg', url: 'https://drive.google.com/thumbnail?id=1RqK2J1qfLAMS4JoFY1AyqE0lTVI4DspD&sz=w1000' },
    { name: 'q4221.jpg', url: 'https://drive.google.com/thumbnail?id=1IbhnNJsoy-qwrZNTfHJ0bFKq-EQbSLxs&sz=w1000' },
    { name: 'q4222.jpg', url: 'https://drive.google.com/thumbnail?id=1fPCo4hAWwAmTH4srvO0TGSJuwW1Lyocu&sz=w1000' },
    { name: 'q4224.jpg', url: 'https://drive.google.com/thumbnail?id=1lfCDt3Nb0zMlbm1ddHsmCcS6PoPpyInA&sz=w1000' },
    { name: 'q4232.jpg', url: 'https://drive.google.com/thumbnail?id=1upDPDcHaA7fop6nztTaXKjBk2rmbNBMm&sz=w1000' },
    { name: 'q4240.jpg', url: 'https://drive.google.com/thumbnail?id=1sPWpjmNX8ZM6zzAlPKFOQYfm_hVro8jK&sz=w1000' },
    { name: 'q4241.jpg', url: 'https://drive.google.com/thumbnail?id=1xC2Dpj8guYyohG_J4bNiYtDcFtmJRP93&sz=w1000' },
    { name: 'q4243.jpg', url: 'https://drive.google.com/thumbnail?id=1FdTHHEEXtafGW6BvQW_vuvbb-CcjYjaH&sz=w1000' },
    { name: 'q4246.jpg', url: 'https://drive.google.com/thumbnail?id=1SbJCpkztyr9qYviKEBLvJTfdAB51sfCK&sz=w1000' },
    { name: 'q4247.jpg', url: 'https://drive.google.com/thumbnail?id=113VDizRVKaEt-STdJMB2YfokOEWFGeQn&sz=w1000' },
    { name: 'q4248.jpg', url: 'https://drive.google.com/thumbnail?id=1BCRLvVUjWi9bkcl31AEA-RBchioft0CH&sz=w1000' },
    { name: 'q4249.jpg', url: 'https://drive.google.com/thumbnail?id=1jQ8XqziUikC2TMdIKiweWsJT7HrMU-iQ&sz=w1000' }
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
