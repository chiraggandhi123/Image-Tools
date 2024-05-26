import { NextApiRequest, NextApiResponse } from 'next';
const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image is required' });
    }

    try {
      const [result] = await client.textDetection({ image: { content: imageUrl.split(',')[1] } });
      const detections = result.textAnnotations;
      res.status(200).json({ text: detections[0]?.description || 'No text found' });
    } catch (error) {
      console.error('Error extracting text===========>', error); // Log the detailed error
      res.status(500).json({ error: `Error extracting text==========> ${error.message}` });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
