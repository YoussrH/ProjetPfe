import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, price, imageUrl } = req.body;

    try {
      const product = await prisma.product.create({
        data: { name, price, imageUrl },
      });

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Database Error' });
    }
  } else if (req.method === 'GET') {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
