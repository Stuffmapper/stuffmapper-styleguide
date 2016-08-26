var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var fs = require('fs');
var app = express();
var config = require('./config');
var menu = config.menu;
var partials = [];
menu.forEach(function(e) {
	e.children.forEach(function(child){
		partials.push(e.name + '/' + child);
	});
});

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

app.get('/partials/:partial/:page', function(req, res, next){
	var renderPartial = '';
	var params = {};
	partials.forEach(function(e) {
		if((e.toLowerCase() === (req.params.partial + '/' + req.params.page).toLowerCase()) > -1) return (renderPartial = 'partials/styleguide-navigation/' + (req.params.partial + '/' + req.params.page));
	});
	if(!renderPartial) return next();
	if(renderPartial === 'partials/styleguide-navigation/design/color-scheme') params.colors = config.colors;
	res.render(renderPartial, params);
});
app.use('*', function(req, res, next) {
	res.render('index', { menu:JSON.stringify(menu) });
});


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



function getDirectories(srcpath) {
	return getFD(srcpath, true);
}
function getFiles(srcpath) {
	return getFD(srcpath, false);
}
function getFD(srcpath, dir) {
	return fs.readdirSync(srcpath).filter(function(file) {
		return fs.statSync(path.join(srcpath, file))[dir?'isDirectory':'isFile']();
	});
}
