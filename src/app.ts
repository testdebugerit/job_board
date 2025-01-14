import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import jobRoutes from './routes/jobRoutes';

// Initialize the app
const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', jobRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Default route for unhandled paths
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
});

export default app;
