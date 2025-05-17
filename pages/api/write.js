import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  // Setup auth dengan service account dari env vars
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL || 'gsheetbooking@aerial-utility-447801-i5.iam.gserviceaccount.com',
      private_key: (process.env.GOOGLE_PRIVATE_KEY || `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCujXCEqqnhooO1\nN7sb6yY2v4JbaqclR8FK3CTnicC+JtVzynCYzsmSDpx1TgUE/153aVK8ijVOabld\nwn9P+jZyPNWXoq3bKjI857wZ1ZpXuRuCj/0XcFd3ydyO/c5YvEqSsRYXVaU9Whqy\necktyCNQaZuJBGWL3eiAe1TPvQRvUOy+8j3i+6eitBi2Yg0iKw4oC1auXYKCaGNw\nSUPnHfrP5+Na63Dm+qKxWiEyf2wwu1JODUBm6eRx/5wm8tV8zVIj61RbUFAb2dI6\nE4fHck/i/mZzP1Zratd2nKqUWfQnMoNkjJKdoqAQ9WCPO4PAcmJhC5MR+T4dUopv\nL8wwOb2tAgMBAAECggEASDZCZNgX1L0/YLKQKVIkaoTa4IfkYzNmv1oIuHMQNnpp\nVvBamZT+5fo+dvcSc4lUIvGDJXXF7M0nPycuNT+N07/gG03VP/SaeQDjnAp2wjDV\ntTNtYIt83BU6NjvA6IvpC/vP6FJpvFJw9gIVHOgN2AAAtPQJMI5a2ABty01mrsfs\nP0CSshKsi2erfSFdm87nVr5gkF5aygukaZgdIbppBJ2vfTMNxXCfkDAt+uxHVePd\nlz2bmzZz02JteOt41UjaRjrtbFW/h71QzR2agH27WMCOfo1F3VbpSt5D+4ccoZz7\nQ/7+vsp4JbvXpMSnxnTBt6PRmYYvc1Jo2a+bW6X/7wKBgQDcy3SNQp40xJYu3RP4\nPnPdRnwBU5VVp0iv83TZR7pJTqlHhuQ91iak1mY2ldA+4+a1yUuJfIMuUTaUyeOU\nYLl90FnrFAaUNvhmhMoB7eFvs+NKeOIEY60MxoW5yr3RRU9WyFsIlceoNSu8hfjX\nOt03Grbj73dUpd08xSdzgTYxjwKBgQDKYnAUYGQb6NYcmivogoNsS1tmFDxawoXi\nZNiyRWQq+kzhJ0xGEqRYuAFRZyZOVPQdguismg64Q3a/ILv6HJ+TxQ5Pd0V3pq/H\nPuEC7Jz8noFSpZ5qUuS62cpPQNz884AqRf5nKuhCMwYP6pIXYdWelBFNgSq818/V\nPjL1WF/HAwKBgQC0S79lCp094bnxkr4X3IeojUH9o08ynmOQqnEkbJoF+qHospH2\nnMT5ncnhkPx4Honqr/Fq164XSGIVpbadF07hGh4TBEtLBIhaztxWLvYDzRUxXvzR\nMMPCxum0CYZvOPXMm9cab5SWGrUYQR4uQvcZZEssXgNHsBm04hmRDFZAqQKBgHTb\nS93oHkWjNmYDexDgsyPHizmwu3yoTwf+tMSSnpjWN6fVugvH3c9AR7qJ9atLED0u\nBk0LEy6//YO0UfXDqzx2jqHBu4Gv5FUGcIPwvWB74S4oZQT9YgallFQYnsELlFhU\nW+WT99GphnmQNtR7cA4FbswypcuuTNnS9TeG1J6jAoGAZcrmNC4TGfAvqrZ7k+Z9\ndWiS4c4ymI0LfLEXwB6UA3WwpR7GoLEMFMXmGKzlMiJKlYE96/RfCODRmWeji0DT\nqyUEUDuY2wtPTDW4d2kBuy7E6v3Md6JiZimLaHc/51jb6NJj39yfAoJxNucJOPWx\nrrVAfD6hOGuWSycbTaoxynI=\n-----END PRIVATE KEY-----\n`).replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = process.env.SHEET_ID || '15HUV51VCF9N277mm73JNFDMwiF1CX2jgG8gS1ZGV4rc';

  const { nama, email } = req.body;

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Data Afiliasi!A1:F1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, username, link, whatsapp, address, commission]],
      },
    });
    res.status(200).json({ success: true, message: 'Data berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
