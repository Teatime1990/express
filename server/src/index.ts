import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose, { mongo } from 'mongoose';
import router from './routers';

const PORT = process.env.PORT || 8000;
const MONGO_URL = 'mongodb+srv://weiluo0220:TiH6Th7aPdm6drmT@cluster0.yqzjxg5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const app = express();

app.use(cors({
    credentials: true,
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`now listening on port ${PORT}`);
})

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());