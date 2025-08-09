import sharp from 'sharp';
import { ensureDir } from 'fs-extra';

const inputFile = './public/Images/logo-1024-1024.webp'; // لوگوی اصلی (حداقل 1024x1024)
const outputDir = './public/icons';

// سایزهای لازم برای PWA
const iconSizes = [48, 72, 96, 144, 192, 256, 384, 512];

// سایز favicon
const faviconSize = 32;

// سایزهای iOS (Apple Touch Icon)
const iosSizes = [120, 152, 167, 180];

async function generateIcons() {
  await ensureDir(outputDir);

  // ساخت آیکون‌های PWA
  for (const size of iconSizes) {
    await sharp(inputFile)
      .resize(size, size)
      .toFile(`${outputDir}/icon-${size}x${size}.png`);
    console.log(`✅ Created icon-${size}x${size}.png`);
  }

  // ساخت favicon
  await sharp(inputFile)
    .resize(faviconSize, faviconSize)
    .toFile('./public/favicon.ico');
  console.log(`✅ Created favicon.ico`);

  // ساخت آیکون‌های iOS
  for (const size of iosSizes) {
    await sharp(inputFile)
      .resize(size, size)
      .toFile(`${outputDir}/apple-touch-icon-${size}x${size}.png`);
    console.log(`✅ Created apple-touch-icon-${size}x${size}.png`);
  }

  // ساخت آیکون ماسکبل (اندروید)
  await sharp(inputFile)
    .resize(512, 512)
    .toFile(`${outputDir}/maskable-icon.png`);
  console.log(`✅ Created maskable-icon.png`);
}

generateIcons().catch(err => console.error(err));
