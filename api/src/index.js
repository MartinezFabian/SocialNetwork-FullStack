import Express from 'express';

const app = Express();
const port = 8800;

app.listen(port, () => {
  console.log(`Server listening on port ${port}: http://localhost:${port}`);
});
