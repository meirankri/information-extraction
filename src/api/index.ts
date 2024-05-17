import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

import StorageService from '../services/FSStorageService';
import File from './usecase/File';
import { roundNumber } from '../utils/number';
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
const upload = multer({ storage: storage }).array('files');

router.post('/upload', async (req: Request, res: Response) => {
  console.log('Uploading files');

  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send(err);
    }
  });
  const storageService = new StorageService(
    path.join(__dirname, '..', 'uploads'),
  );
  const file = new File(storageService);

  const numberOfFiles = await file.getNumberOfFiles();
  const roundedNumber = roundNumber(numberOfFiles);
  let response: object = {};
  if (!roundedNumber) response = { message: 'files is under 10' };

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

  res.json(response);
});

export default router;
