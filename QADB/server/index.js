const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const routers = require('./routes');

app.use(cors());
app.use(bodyParser())
app.use('/sql/', routers.routerSQL);

const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`service is running on port ${port}`));