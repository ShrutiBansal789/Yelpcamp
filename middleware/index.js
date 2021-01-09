var Campground = require("../models/campground");
var Comment    = require("../models/comment");

// all the middleware goes here

var middlewareObj = {};
middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground not found!");
				res.redirect("back");
			} else {
				// check if foundCampground exists & if it doesnt to throw an error via connect-flash & send us back to homepage
				if(!foundCampground){
					req.flash("error", "Item not found!");
					res.redirect("back");
				}
				// if the upper condition is true this will break out of middleware & prevent code below to crash our application
				// does the user own the campground
				if(foundCampground.author.id.equals(req.user._id)){				
					next();
				} else {
					req.flash("error", "You do not have permission to do that!");
					res.redirect("back");
						}
					}
	  	 });
	} else {
		req.flash("error", "You need to be logged in to do that!");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			} else {
				// check if foundComment exists & if it doesnt to throw an error via connect-flash & send us back to homepage
				if(!foundComment){
					req.flash("error", "Item not found!");
					res.redirect("back");
				}
				// if the upper condition is true this will break out of middleware & prevent code below to crash our application
				// does the user own the comment
				if(foundComment.author.id.equals(req.user._id)){				
					next();
				} else {
					req.flash("error", "Sorry! You donot have permission to do that!");
					res.redirect("back");
						}
					}
	  	 });
	} else {
		req.flash("error", "You need to be logged in to do that!");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that!");
	res.redirect("/login");
}

module.exports = middlewareObj;