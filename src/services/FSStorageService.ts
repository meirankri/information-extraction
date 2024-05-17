import { StorageRepository } from '@/api/types/interfaces';
import fs from 'fs';
import path from 'path';

class FSStorageService implements StorageRepository {
  constructor(private readonly storagePath: string) {}

  async getNumberOfFiles(): Promise<number> {
    const files = await fs.promises.readdir(this.storagePath);
    const fileCount = files.filter((file) => path.extname(file) !== '').length;
    return fileCount;
  }

  async getOldestFiles(count: number): Promise<string[]> {
    return fs
      .readdirSync(this.storagePath)
      .map((name) => ({
        name,
        time: fs.statSync(path.join(this.storagePath, name)).mtime.getTime(),
      }))
      .sort((a, b) => a.time - b.time)
      .slice(0, count)
      .map((f) => f.name);
  }
}

export default FSStorageService;
