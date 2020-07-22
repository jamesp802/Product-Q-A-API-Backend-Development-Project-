const express = require('express');
const bodyParse = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const routers = require('./routes');

app.use(cors());
app.use('/sql/', routers.routerSQL);

const routerMongo = express.Router();
const port = 1337;
app.listen(port, () => console.log(`service is running on port ${port}`));