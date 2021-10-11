import express from 'express';

const router = express.Router();

router.use(express.static('./public'));
router.get('/', (req, res) => res.sendFile('index.html', { root: './public' }));

export default router;