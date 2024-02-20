import express from 'express';
import bodyParser from 'body-parser';
import setgoalsRoutes from './src/routes/setgoalsRoutes.js';
import getgoalsRoutes from './src/routes/getgoalsRoutes.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json())

app.use("/api", getgoalsRoutes);
app.use("/api", setgoalsRoutes);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
});