import StorageService from '../services/storageService';

class RoundNumberChecker {
  private storageService: StorageService;

  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  async isRoundNumber(): Promise<boolean> {
    const files = await this.storageService.getOldestFiles(
      Number.MAX_SAFE_INTEGER,
    );
    return files.length % 10 === 0;
  }
}

export default RoundNumberChecker;
