const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const routers = require('./routes');

app.use(cors());
app.use(bodyParser());
app.use('/sql/', routers.routerSQL);

app.get('/loaderio-a91a4b03da2639ccb5c57683de7c1ac3', (req, res) => {
  res.send('loaderio-a91a4b03da2639ccb5c57683de7c1ac3');
})


const port = process.env.PORT || 1337;
app.listen(port, ((data, err) => {
 if (err) {
 console.log(err);
 } else {
 console.log(`service is running on port ${port}`);
 }
}));
