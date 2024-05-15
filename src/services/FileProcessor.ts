import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import StorageService from './FSStorageService';

class FileProcessor {
  private storageService: StorageService;

  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  async processFiles(files: string[]): Promise<void> {
    const pdfFiles: string[] = [];

    for (const file of files) {
      const filePath = path.join('uploads', file);
      if (file.endsWith('.pdf')) {
        const imageFile = await this.extractFirstPage(filePath);
        pdfFiles.push(imageFile);
      } else {
        pdfFiles.push(filePath);
      }
    }

    await this.createFinalPdf(pdfFiles);
  }

  private extractFirstPage(filePath: string): Promise<string> {
    const outputImage = `${filePath}.jpg`;
    return new Promise((resolve, reject) => {
      exec(
        `convert -density 300 ${filePath}[0] ${outputImage}`,
        (error, stdout, stderr) => {
          if (error) {
            reject(error);
          } else {
            resolve(outputImage);
          }
        },
      );
    });
  }

  private createFinalPdf(images: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const outputPdf = 'final.pdf';
      exec(
        `convert ${images.join(' ')} ${outputPdf}`,
        (error, stdout, stderr) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
  }
}

export default FileProcessor;
