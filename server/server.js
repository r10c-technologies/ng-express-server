const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const rewrite = require('express-urlrewrite');

const port = 80;
const app = express();

app.use(rewrite('/dev/*', '/$1'));
app.use(rewrite('/qa/*', '/$1'));
app.use(compression());
app.use(express.static('src'));
app.use(cors());c
app.disable("x-powered-by");
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, (err) => {
    if (err == null) 
        console.log("\x1b[32m%s\x1b[0m", `Server started on port:${port}`);
    else 
        console.log(err);
});