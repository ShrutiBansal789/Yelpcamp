var express             = require("express"),
    app                 = express(),
    bodyParser  		= require("body-parser"),
    mongoose    		= require("mongoose"),
    flash               = require("connect-flash"),
    passport    		= require("passport"),
    LocalStrategy		= require("passport-local"),
    methodOverride      = require("method-override"),
    Campground  		= require("./models/campground"),
    Comment     		= require("./models/comment"),
    User 				= require("./models/user"),
    seedDB      		= require("./seeds");

// Requiring Routes
var commentRoutes  	    = require("./routes/comments"),
   	campgroundRoutes    = require("./routes/campgrounds"),
   	indexRoutes 	    = require("./routes/index");

// SETUP
mongoose.connect("mongodb://localhost:27017/yelp_camp_v11", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();  //SEED the Database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog in the world!", 
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware for our all routes to pass currentUser: req.user
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
	next();
});

// requiring routes file
app.use("/", indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function(){
	console.log("The YelpCamp Server has started!");
});