import * as fs from 'fs';
import * as path from 'path';

const recupererCatalogueKey = () => {
  const filePath = path.join(__dirname, '..', '..', 'keys/catalogue.txt');
  const key = fs.readFileSync(filePath, 'utf-8').trim();
  return key;
};

export { recupererCatalogueKey };
