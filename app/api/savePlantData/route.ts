// API handler example
import { NextApiRequest, NextApiResponse } from 'next';
import { savePlantDataToFirestore } from '@/libs/firestore/firestoreOperations';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request method:', req.method);
  console.log('Request body:', req.body);

  if (req.method === 'POST') {
    try {
      const data = req.body;
      console.log('Data to save:', data);
      await savePlantDataToFirestore('plantCollection', data);
      res.status(200).json({ message: 'Plant data saved successfully' });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error saving plant data:", error.message, error.stack);
        res.status(500).json({ error: 'Failed to save plant data', details: error.message });
      } else {
        console.error("Unexpected error saving plant data:", error);
        res.status(500).json({ error: 'Failed to save plant data', details: 'Unexpected error occurred' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
