
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const expressHbs = require('express-handlebars').create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: 'layout',
  extname: '.hbs'
});



var indexRouter = require('./routes/index');
var shopRouter = require('./routes/shop');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var productPageRouter = require('./routes/productPage');
var signRouter = require('./routes/sign');
var accountRouter = require('./routes/account');
var cartRouter = require('./routes/cart');
var orderRouter = require('./routes/order');
var chatbotRouter= require('./routes/chatbot');
var crmRouter= require('./routes/crm');
var crmStatus= require('./routes/status');
var crmIssues= require('./routes/issue');
var deleteEmployeeRouter = require('./routes/deleteEmployee');
var leadConfirmed = require('./routes/leadConfirmed');
var leadCanceled = require('./routes/leadCanceled');
var addEmployee = require('./routes/addEmployee');



var router = express.Router();
var app = express();


const session = require('express-session');

app.use(session({
  secret: 'secretAZ',
  resave: true,
  saveUninitialized: true,
}));



// view engine setup
app.engine('.hbs',expressHbs.engine);
app.set('view engine', '.hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/shop', shopRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/product', productPageRouter);
app.use('/sign', signRouter);
app.use('/account', accountRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/crm', crmRouter);
app.use('/crm/status', crmStatus);
app.use('/crm/issues', crmIssues);
app.use('/crm/deleteEmployee', deleteEmployeeRouter);
app.use('/crm/leadConfirmed',leadConfirmed);

app.use('/crm/leadCanceled',leadCanceled);
app.use('/crm/addEmployee',addEmployee);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// pour  l evoi d'email
app.use(express.urlencoded({ extended: true }));

module.exports = app;
