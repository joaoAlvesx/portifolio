import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

await mkdir('public/images', { recursive: true });
await Promise.all([
  sharp('imagens/Fotosuatrabalhando.jpeg').rotate().extract({ left: 0, top: 640, width: 900, height: 700 }).webp({ quality: 82 }).toFile('public/images/laboratorio.webp'),
  // Only the robots and lower part of the bench: leave identifiable faces out.
  sharp('imagens/ararabots.jpeg').rotate().extract({ left: 0, top: 800, width: 1200, height: 800 }).webp({ quality: 82 }).toFile('public/images/ararabots.webp'),
  sharp('imagens/robolabirinto.jpeg').rotate().resize({ width: 1120, height: 640, fit: 'cover', position: 'centre' }).webp({ quality: 82 }).toFile('public/images/robo-labirinto.webp'),
  sharp('imagens/gostodumatu.png').resize({ width: 1120, height: 640, fit: 'cover' }).webp({ quality: 85 }).toFile('public/images/gosto-du-matu.webp'),
]);

const social = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#F6F3EC"/><path d="M70 110H1130M70 530H1130" stroke="#D8D3C8"/><text x="70" y="80" font-family="sans-serif" font-size="24" fill="#615E54">JOÃO GONÇALVES / LABORATÓRIO DIGITAL</text><text x="70" y="270" font-family="sans-serif" font-size="78" fill="#292B24">Da ideia à</text><text x="70" y="365" font-family="sans-serif" font-size="78" fill="#586B39">infraestrutura.</text><text x="70" y="490" font-family="sans-serif" font-size="25" fill="#615E54">Linux · Redes · Software · Robótica</text></svg>`;
await sharp(Buffer.from(social)).webp({ quality: 90 }).toFile('public/images/social.webp');
console.log('Cinco imagens públicas geradas. Os arquivos privados não são processados.');
