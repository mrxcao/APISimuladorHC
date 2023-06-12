const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pkg = require('./package.json')

const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = process.env.PORT


app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json({ limit: '100mb' }));

const routes = require("./routes/routes");
routes(app);



app.listen(port, () => {
  console.log(`-- ${pkg.name} listening on port ${port}`)
})