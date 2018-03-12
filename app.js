// App Engine
const express = require("express");
const app = express();

// Form Data Collection
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// Updating Data - PATCH, DELETE
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Templating Engine - PUG
app.set("view engine", "pug");
app.use(express.static(__dirname + '/assets'));

// Data Storage (Without Database)
const users = [];
var id = 1;

// Redirect to Hompage
app.get('/', (req, res, next) => {
	return res.redirect('/users');
});

// Homepage
app.get('/users', (req, res, next) => {
	console.log(users);
	return res.render("index", {users});
});

// New User Page
app.get('/users/new', (req, res, next) => {
	return res.render("new");
});

// Single User Page
app.get('/users/:id', (req, res, next) => {
	const user = users.find(val => val.id === Number(req.params.id));
	return res.render("show", {user});
});

// Edit Single User Form Page
app.get('/users/:id/edit', (req, res, next) => {
	const user = users.find(val => val.id === Number(req.params.id));
	return res.render("edit", {user});
})

// New User Form Submit
app.post('/users', (req, res, next) => {
	console.log(req.body);
	users.push({
		name: req.body.name,
		id // ES6 --> same as id: id
	});
	id++ // add 1 if another user is to be added (next user will have id = 2)
	return res.redirect('/users');
});

// Edit User Info (Change Name)
app.patch('/users/:id', (req, res, next) => {
	console.log(req.params);
	console.log(req.body);
	const user = users.find(val => val.id === Number(req.params.id));
	user.name = req.body.name;
	return res.redirect('/users');
});

app.listen(3000, () => console.log("Head over to that localhost of yours..."));