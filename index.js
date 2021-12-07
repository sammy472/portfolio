//Import required modules
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const port = process.env.PORT || 9000;
//body-parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
//create a transporter function
function SendEmail(firstNmae, lastName, from, subject, message) {
    const mailtransporter = nodemailer.createTransport({
        service: 'samuelboateng472@gmail.com',
        auth: {
            user: from,
            pass: 'Newtonian472'
        }

    })
    const context = {
        from: firstNmae + " " + lastName + "<" + from + ">",
        to: 'samuelboateng472@gmail.com',
        subject: subject,
        text: message,
        html: "<p>" + message + "</p>",
        generateTextFromHtml: true

    };
    mailtransporter.sendMail(context, (err, res) => {
        if (err) return;

    });

};
//set up the handlebars template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
//setup static files path
app.use(express.static(path.join(__dirname, './public')));
//Request hanldlers
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/resume', (req, res) => {
    res.render('resume');
});
app.get('/projects', (req, res) => {
    res.render('projects');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});
app.get('/download', (req, res) => {
    res.download('./public/cv/sammy.pdf', (err, info) => { return });
});
app.post('/email', (req, res) => {
    const { firstNmae, lastName, email, subject, message } = req.body;
    SendEmail(firstNmae, lastName, email, subject, message);
    res.redirect(303, 'contact');
});
//Server set up
app.listen(9000, () => {
    console.log('Server is listening on port 9000');
});