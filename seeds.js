var mongoose     = require("mongoose"),
    Campground   = require("./models/campground"),
    Comment      = require("./models/comment");

var seeds = [
	{
		name: "CLoud's Rest",
		image: "https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?auto=compress&cs=tinysrgb&h=350",
		description: "Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux. It comes with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages (such as C++, C#, Java, Python, PHP, Go) and runtimes (such as .NET and Unity). Begin your journey with VS Code with these"
	},
	{
		name: "Desert Sarah",
		image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=350",
		description: "Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux. It comes with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages (such as C++, C#, Java, Python, PHP, Go) and runtimes (such as .NET and Unity). Begin your journey with VS Code with these"
	},
	{
		name: "WaterFall camping",
		image: "https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg?auto=compress&cs=tinysrgb&h=350",
		description: "Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux. It comes with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages (such as C++, C#, Java, Python, PHP, Go) and runtimes (such as .NET and Unity). Begin your journey with VS Code with these"
	}
];

function seedDB(){
	// Remove all campgrounds
	Campground.deleteMany({}, function(err){
		if(err) {
			console.log(err);
			}
				console.log("REMOVED CAMPGROUNDS!!!");
					// add a few campgrounds
					data.forEach(function(seed){
						Campground.create(seed, function(err, campground){
							if(err){
								console.log(err)
							} else {
								console.log("Added a campground");
								// Create a comment
								Comment.create(
									{
										text: "This place is great, but I wish I had internet!",
										author: "Homer" 
									}, function(err, comment){
										if(err){
											console.log(err)
										} else {
											campground.comments.push(comment);
											campground.save();
											console.log("Created new comment!");
										}
									});
								}
							});
						});
				});
		}
module.exports = seedDB;



// async function seedDB(){
// 	try{
// 		// Remove all campgrounds
// 	await Campground.deleteMany({});
// 	// console.log("campgrounds removed!!");
// 	// // Remove all comments
// 	// await Comment.deleteMany({});
// 	// console.log("Comments removed!!");

// 	// for(const seed of seeds) {
// 	// 	let campground = await Campground.create(seed);
// 	// 	console.log("Campground created");
// 	// 	let comment = await Comment.create(
// 	// 		{
// 	// 			text: "This place is great, but I wish I had internet!",
// 	// 			author: "Homer" 
// 	// 		});
// 	// 	console.log("Comment created!!!");
// 	// 	campground.comments.push(comment);
// 	// 	campground.save();
// 	// 	console.log("Comment added to campground!");
// 	// 	}
// 	// } catch(err) {
// 	// 	console.log(err);
// 	// }						
// }
module.exports = seedDB;