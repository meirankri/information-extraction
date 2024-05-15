import express, { Request, Response } from 'express';
import multer from 'multer';
import StorageService from '../services/FSStorageService';
// import RoundNumberChecker from '../utils/roundNumberChecker';
// import FileProcessor from '../services/FileProcessor';
// import DataExtractor from '../services/DataExtractor';
// import DataVerifier from '../services/DataVerifier';

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  '/upload',
  upload.array('files'),
  async (req: Request, res: Response) => {
    const storageService = new StorageService();
    // const files = req.files as Express.Multer.File[];

    // for (const file of files) {
    //   await storageService.addFile(file);
    // }

    // const checker = new RoundNumberChecker(storageService);
    // if (await checker.isRoundNumber()) {
    //   const oldestFiles = await storageService.getOldestFiles(10);
    //   const fileProcessor = new FileProcessor(storageService);
    //   await fileProcessor.processFiles(oldestFiles);

    //   const dataExtractor = new DataExtractor();
    //   for (const file of oldestFiles) {
    //     const data = await dataExtractor.extractAndCleanData(file);
    //     const verifier = new DataVerifier();
    //     await verifier.verifyData(data);
    //   }
    // }

    res.send('Files uploaded and processed');
  },
);

export default router;
