import express from 'express';
import { createInfluencer, getInfluencers } from '../controllers/influencerController';

const router = express.Router();

router.post('/', createInfluencer);
router.get('/', getInfluencers);

export default router;