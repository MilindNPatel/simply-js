import express from 'express';
const app = express();
import * as bodyParser from "body-parser";
require('dotenv').config({ path: '.env' });
require('./src/config/dbConnection');
import { ROUTER_LINKS } from './src/config/index';

const PORT = process.env.PORT || 9000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome');
});

import { settingRoute } from './src/routes';

app.use(ROUTER_LINKS.API, settingRoute);

app.get('*', (req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});
