import db from '../database'; // Import your database connection
import { RowDataPacket } from 'mysql2';

export class JobService {
    async getAllJobs(): Promise<RowDataPacket[]> {
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM jobs');
        return rows;
    }

    async getJobById(id: number): Promise<RowDataPacket | null> {
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM jobs WHERE id = ?', [id]);
        return rows.length ? rows[0] : null;
    }

    async createJob(job: Omit<RowDataPacket, 'id'>): Promise<number> {
        const [result]: any = await db.query('INSERT INTO jobs SET ?', [job]);
        return result.insertId;
    }

    async updateJob(id: number, job: Partial<RowDataPacket>): Promise<boolean> {
        const [result]: any = await db.query('UPDATE jobs SET ? WHERE id = ?', [job, id]);
        return result.affectedRows > 0;
    }

    async deleteJob(id: number): Promise<boolean> {
        const [result]: any = await db.query('DELETE FROM jobs WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
