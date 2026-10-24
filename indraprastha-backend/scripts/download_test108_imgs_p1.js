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
    { name: 'q4250.jpg', url: 'https://drive.google.com/thumbnail?id=1FPCZORTx3riLTWBTTi1CHPet2DrBTZtv&sz=w1000' },
    { name: 'q4255.jpg', url: 'https://drive.google.com/thumbnail?id=1RIiEOfFr0CqEi3jxSPYsTnpRQkP6t7-B&sz=w1000' },
    { name: 'q4260.jpg', url: 'https://drive.google.com/thumbnail?id=19WM7lIgb14pXoAgyjxwFr-10dwZgraEz&sz=w1000' },
    { name: 'q4261.jpg', url: 'https://drive.google.com/thumbnail?id=1IkfVYMso-kHsPtKIOVyd4Ail-jHlsclN&sz=w1000' },
    { name: 'q4262.jpg', url: 'https://drive.google.com/thumbnail?id=1NXtms88SuBWm7TgqSq2OYVywyWZw36VX&sz=w1000' },
    { name: 'q4263.jpg', url: 'https://drive.google.com/thumbnail?id=1G0Xk0_Vi8wKQ2SIywAOIREvAXTcs39Hl&sz=w1000' },
    { name: 'q4264.jpg', url: 'https://drive.google.com/thumbnail?id=14l0aKyWdAuSyZrfx3UwTqbLEOpo7KKIt&sz=w1000' },
    { name: 'q4266.jpg', url: 'https://drive.google.com/thumbnail?id=14KfUY9oskFjThul59MusrPcLKfNqHd-U&sz=w1000' },
    { name: 'q4268.jpg', url: 'https://drive.google.com/thumbnail?id=1_emarz52m_WyOZVIGEI8IfeHG70lNZTW&sz=w1000' },
    { name: 'q4269.jpg', url: 'https://drive.google.com/thumbnail?id=1TDYyFbx9bf5h5UOhWrLK4HyL6ySe-M25&sz=w1000' },
    { name: 'q4270.jpg', url: 'https://drive.google.com/thumbnail?id=1VTA3yEEw8kvwkL-FRG4ykJ-5Ls6RiSk7&sz=w1000' }
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
