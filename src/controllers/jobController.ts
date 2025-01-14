import { Request, Response, NextFunction } from 'express';
import { JobService } from '../services/jobService'; // Import your service layer

const jobService = new JobService(); // Assuming JobService is a class you instantiate

export const fetchAllJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobs = await jobService.getAllJobs();
        res.json(jobs);
    } catch (error) {
        next(error); // Pass errors to the error handler
    }
};

export const fetchJobById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobId = parseInt(req.params.id, 10);
        if (isNaN(jobId)) {
            return res.status(400).json({ message: 'Invalid job ID' });
        }
        const job = await jobService.getJobById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        next(error);
    }
};

export const createNewJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobData = req.body;
        const jobId = await jobService.createJob(jobData);
        res.status(201).json({ message: 'Job created', jobId });
    } catch (error) {
        next(error);
    }
};

export const updateJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobId = parseInt(req.params.id, 10);
        const jobData = req.body;

        if (isNaN(jobId)) {
            return res.status(400).json({ message: 'Invalid job ID' });
        }

        const updated = await jobService.updateJob(jobId, jobData);
        if (!updated) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: 'Job updated' });
    } catch (error) {
        next(error);
    }
};

export const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobId = parseInt(req.params.id, 10);

        if (isNaN(jobId)) {
            return res.status(400).json({ message: 'Invalid job ID' });
        }

        const deleted = await jobService.deleteJob(jobId);
        if (!deleted) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: 'Job deleted' });
    } catch (error) {
        next(error);
    }
};
