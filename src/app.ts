import express from 'express';
import router from './routes';
import {fetchRows, pushRows } from './solving';

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);

  try {
    const { totalClassesSemester, students } = await fetchRows();
    await pushRows(students);
  } catch (error) {
      console.error(error);
  }
});

export default app;