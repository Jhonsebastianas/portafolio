import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(); // puedes usar variables de entorno para el host/puerto

export const emailQueue = new Queue('emailQueue', { connection });