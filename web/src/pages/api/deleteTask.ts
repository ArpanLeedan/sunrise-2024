import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteTask } from '../../modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { taskId } = req.body;
    if (typeof taskId === 'number') {
      deleteTask(taskId);
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(400).json({ error: 'Invalid data' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
