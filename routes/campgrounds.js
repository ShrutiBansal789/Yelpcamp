var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
 
// Index Route - show all campgrounds
router.get("/", function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("./campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});

// Create Route - Add new campground to database
router.post("/", middleware.isLoggedIn, function(req, res){
	//get data from form & add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, image: image, description: desc, author: author};
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			// redirect to campgrounds page
			// console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
});

// New Route - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("./campgrounds/new");
});

// Show Route - SHOWCASE more info about one campground
router.get("/:id", function(req, res){
	// find the campground with provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			if(!foundCampground){
				return res.status(400).send("Item not found!");
			}
			// console.log(foundCampground);
			// render show template waith that campground
			res.render("./campgrounds/show", {campground: foundCampground});
		}
	});
});

// EDIT campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
		// is user logged in
		Campground.findById(req.params.id, function(err, foundCampground){
			if(!foundCampground){
				return res.status(400).send("Item not found!");
			}				
			res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// UPDATE campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	// find and update the correct campground	
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			req.flash("error", "Campground not found!");
			res.redirect("/campgrounds");
		} else{
			// redirect somewhere(show page)
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Congratulations! Campground Deleted!");
			res.redirect("/campgrounds");
		}
	})
});



module.exports = router;