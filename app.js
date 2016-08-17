var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/libs', express.static(path.join(__dirname, 'bower_components')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));

app.use('/css', sassMiddleware({
	src: 'sass',
	dest: 'css',
	debug: true,
	// outputStyle: 'compressed',
	force: true
}));

app.get('/partials/:partial', function(req, res, next){
	var renderPartial = '';
	[
		'introduction',
		'code-guidelines',
		'color-scheme',
		'typography',
		'animation',
		'border-radius',
		'box-shadow',
		'layout',
		'icon',
		'avatars',
		'buttons',
		'form-elements',
		'grid',
		'links',
		'lists',
		'modals',
		'popovers',
		'aspect-ratio',
		'center-elements',
		'hide-elements',
		'layout',
		'text-manipulation'
	].forEach(function(e) {
		if((e === req.params.partial) > -1) return (renderPartial = 'partials/' + req.params.partial);
	});
	if(!renderPartial) return next();
	res.render(renderPartial);
});
app.use('*', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
