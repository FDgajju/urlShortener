import express from 'express';

import bodyParser from 'body-parser';
import morgan from 'morgan';

import UrlRoute from './routes/urlRoute.js';
import userRoute from './routes/userRoute.js';
import verifyRoute from './routes/verifyRoute.js';
import redirectRoute from './routes/redirectRoute.js';
const app = express();

// global middleWares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/', UrlRoute);
app.use('/', redirectRoute);
app.use('/user', userRoute);
app.use('/verify', verifyRoute);

export default app;
