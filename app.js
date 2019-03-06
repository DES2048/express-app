const express = require('express');
const app = express();
const config = require('./config');
const db = require('./database');

app.set('view engine', 'ejs');

app.get('/', (req, resp) => resp.render('index'));

const about_data ={
    name: "Oleg Podzorov",
    email: "electrochange@mail.ru",
    phone: "+7 (908) 181-61-03",
    skills: [
        '1C Enterprise',
        'Java',
        'Python',
        'Django'
    ]
}

app.get("/about", (req, resp) => resp.render('about', about_data));

app.get("/post-data", (req, resp) => resp.render('post'));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded(
    {
        extended: true
    }
));

app.post("/post-data", (req, resp) => {
        resp.render('post-result',
            {
                name: req.body.name,
                surname: req.body.surname,
            }
        );
    }
);

db().then(info => {
    console.log(`Connected to db: ${info.host}:${info.port}/${info.name}`);
    app.listen(config.PORT, () => console.log("Start listening on port", config.PORT));
}).catch(() => {
    console.error("Unable to connect db");
    process.exit(1);
}

)


