import fs from 'fs';
import path from 'path';

class FSStorageService {
  private storagePath = 'uploads';

  async addFile(file: Express.Multer.File): Promise<void> {
    const fileName = path.basename(file.path);
    console.log('path', this.storagePath, fileName);

    const dest = path.join(this.storagePath, fileName);
    fs.renameSync(file.path, dest);
  }

  async getOldestFiles(count: number): Promise<string[]> {
    const files = fs
      .readdirSync(this.storagePath)
      .map((name) => ({
        name,
        time: fs.statSync(path.join(this.storagePath, name)).mtime.getTime(),
      }))
      .sort((a, b) => a.time - b.time)
      .slice(0, count)
      .map((f) => f.name);

    return files;
  }
}

export default FSStorageService;
