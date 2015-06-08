var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('add_page',{title:'WIKISTACK'});
});

/*var generateUrlName = function(name) {
	  if (typeof name != "undefined" && name !== "") {
	    // Removes all non-alphanumeric characters from name
	    // And make spaces underscore
	    return name.replace(/\s/gi, '_').replace(/\W/ig,'');
	  } else {
	    // Generates random 5 letter string
	    return Math.random().toString(36).substring(2,7);
	  }
};


router.post('/submit', function(req, res) {
  var models = require('../models/');
  // STUDENT ASSIGNMENT:
  // add definitions of the `title`, `body` and `url_name` variables here
  var title = req.body.title;
  console.log(title);
  var body = req.body.content;
  var url_name=generateUrlName(req.body.title);
  var tag = req.body.tag.split(' ');
  var page = new models.Page({ 'title': title, 'content': content, 'url_name': url_name, 'tag':tag});
  console.log(page);
  page.save();
  //res.redirect('/');
});
*/
module.exports = router;
