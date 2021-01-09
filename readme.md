

#Auth Pt. 3 : LOGIN
	*Add Login routes
	*Add login template

#Auth pt. 4 : Logout/ Navbar
	*Add logout route
	*Prevent user from adding a comment if not signed in
	*Add links to navbar

#Auth pt. 5 : Show/Hide Links
	*Show/ hide links in navbar correctly

#Refactor the Routes
	*Use Express router to reorganise all routes

#Users + Comments
	*Associate users and comments
	*Save author's name to a comment automatically

#Users + Campgrounds
	*Prevent an unauthenticated user from creating a campground
	*Save username+id to newly created campground

#Editing Campgrounds
	*Add Method-Override
	*Add Edit Route for campgrounds
	*Add link to Edit Page
	*Add Update Route
	*Fix $set problem

#Deleting Campgrounds
	*Add Destroy Route
	*Add Delete button

#Authorization PArt-1: Campgrounds
	*User can  only edit his/her campgrounds
	*User can only delete his/her campgrounds
	*Hide/Show edit and delete buttons

#Editing Comments
	*Add EDIT routefor comments
	*Add EDIT BUTTON
	*Add UPDATE route

Campground Edit Route: <!--/campgrounds/:id/edit -->
Comment Edit Route: <!--/campgrounds/:id/comments/:comment_id/edit -->

#Deleting Comments
	*Add Destroy route
	*Add Delete button

Campground Delete Route: <!--/campgrounds/:id -->
Comment Delete Route: <!-- /campgrounds/:id/comments/:comment_id --> 

#Authorization Part-2: Comments
	*User can only ediy his/her commments
	*User can only delete his/her comments
	*Hide/show edit and delete buttons
	*Refactor MIDDLEWARE

#Adding in Flash!
	*Demo working version
	*Install and configure connect-flash
	*Add bootstrap alerts to header