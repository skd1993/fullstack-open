import express from 'express';
import {addPatientRouter, diagnosesRouter, patientsRouter} from "./routes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/ping', (_req, res) => {
  res.status(200).send('pong');
});

app.get('/api/diagnoses', diagnosesRouter);
app.get('/api/patients', patientsRouter);
app.post('/api/patients', addPatientRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});