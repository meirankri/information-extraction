import nodemailer from 'nodemailer';

class DataVerifier {
  async verifyData(data: any): Promise<void> {
    const isValid = await this.checkDataAgainstDatabase(data);
    if (!isValid) {
      await this.sendEmail(data);
    }
  }

  private checkDataAgainstDatabase(data: any): Promise<boolean> {
    // Vérification des données en base de données
    return Promise.resolve(true);
  }

  private sendEmail(data: any): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: 'recipient@example.com',
      subject: 'Data Mismatch Alert',
      text: `Data mismatch found: ${JSON.stringify(data)}`,
    };

    return transporter.sendMail(mailOptions);
  }
}

export default DataVerifier;
