import FSStorageService from '../services/FSStorageService';

const fs = require('fs');
const path = require('path');

describe('Add files to storage', () => {
  beforeAll(async () => {
    // Clear uploads folder

    const uploadsFolder = path.join(__dirname, 'uploads');

    fs.readdirSync(uploadsFolder).forEach((file: string) => {
      // Add type annotation to 'file' parameter
      if (file.endsWith('.gitignore')) return;
      const filePath = path.join(uploadsFolder, file);
      fs.unlinkSync(filePath);
    });
  });

  test('should upload files and process them', async () => {
    // create file
    const file = await fs.createWriteStream('test.pdf');
    console.log('file', file);

    const storage = new FSStorageService();
    storage.addFile(file);
  });
});
