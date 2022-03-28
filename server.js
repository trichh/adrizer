const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', require('./api/routes.js'));

app.listen(4000, function() {
  console.log("Server running on PORT: 4000");
});
