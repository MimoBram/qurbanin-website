const express = require('express');
const app = express();
const router = require('./routes/router');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

const port = 3000;
app.listen(port, () => {
  console.log(`QurbanIn running on http://localhost:${port}`)
});