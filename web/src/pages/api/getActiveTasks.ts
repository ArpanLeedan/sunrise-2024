// pages/api/activeTasks.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { getActiveTasks } from '../../modules/taskManager';  // Update the path based on your directory structure

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const tasks = getActiveTasks();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
