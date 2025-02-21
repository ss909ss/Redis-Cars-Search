import { createIndex } from '../../lib/redis';

export default async function handler(req, res) {
    try {
        await createIndex();
        res.status(200).send('ok');
    } catch (error) {
        console.error('Error in /api/createIndex:', error);
        res.status(500).send('Internal Server Error');
    }
}