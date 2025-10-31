import express from 'express';
import cors from 'cors';
import dotEnv from 'dotenv';
import authRouter from './src/routes/auth.routes.js';
import projectsRouter from './src/routes/projects.routes.js';
import issuesRouter from './src/routes/issues.routes.js';


dotEnv.config();
const app =  express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/projects', projectsRouter);
app.use('/api/v1/issues', issuesRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'issue-tracker-api' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});


export default app;