const express = require('express');
const path = require("node:path");
const adminRouter = require('./routes/adminRouter');
const homeRouter = require('./routes/homeRouter');

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/admin', adminRouter);
app.use('/home', homeRouter);

app.get('/', (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`App running @ http://localhost:${port}`);
})