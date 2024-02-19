import express from 'express'
import bodyParser from 'body-parser'
import setgoalsRoutes from './routes/setgoalsRoutes.js'

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json())

app.use("/", setgoalsRoutes);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
});