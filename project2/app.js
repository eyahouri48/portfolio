
const express=require('express');
const expressLayouts=require("express-ejs-layouts");
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);// to not repeat ourselves and to wrap all the pages by the html of main.ejs layout
app.set('layout','./layouts/main');


app.use("/", require("./server/routes/main.js"));


app.listen(port, () => {
    console.log(`App listening at ${port}`);
});


