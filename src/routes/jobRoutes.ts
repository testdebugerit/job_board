import express from 'express';
import {
    fetchAllJobs,
    fetchJobById,
    createNewJob,
    updateJob,
    deleteJob,
} from '../controllers/jobController';

const router = express.Router();

router.get('/jobs', fetchAllJobs);
router.get('/jobs/:id', fetchJobById);
router.post('/jobs', createNewJob);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);

export default router;
