import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { sendEmailByTemplate } from '../infrastructure/services/email.js';

const connection = new IORedis();

const worker = new Worker(
  'emailQueue',
  async job => {
    const { template, subject, to, parameters } = job.data;
    await sendEmailByTemplate({ template, subject, to, parameters });
    console.log(`Correo enviado a ${to} con el asunto: ${subject}`);
  },
  { connection }
);

worker.on('failed', (job, err) => {
  console.error(`Fallo al enviar correo a ${job.data.to}:`, err);
});
