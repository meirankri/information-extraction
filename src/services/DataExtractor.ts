// import { DocumentUnderstandingServiceClient } from '@google-cloud/documentai';
// import fs from 'fs';

// class DataExtractor {
//   private client: DocumentUnderstandingServiceClient;

//   constructor() {
//     this.client = new DocumentUnderstandingServiceClient();
//   }

//   async extractAndCleanData(file: string): Promise<any> {
//     const document = {
//       content: fs.readFileSync(file, 'base64'),
//       mimeType: 'application/pdf',
//     };

//     const [result] = await this.client.processDocument({
//       parent: `projects/YOUR_PROJECT_ID/locations/YOUR_LOCATION`,
//       document: document,
//     });

//     const rawData = result.document;
//     return this.cleanData(rawData);
//   }

//   private cleanData(data: any): any {
//     // Nettoyage des données extraites
//     return data;
//   }
// }

// export default DataExtractor;
