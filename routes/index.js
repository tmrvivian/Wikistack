var express = require('express');
var router = express.Router();
var Page = require('../models/').Page;
/*var mongoose = require('mongoose')
var page = mongoose.model('Page')*/

/* GET home page. */
router.get('/', function(req, res, next) {
  Page.find({},function(err, data){
  	res.render('index', { title: 'Wikistack', page:data});
  });
});

router.get('/wiki/:url', function(req, res, next){
	Page.find({url_name:req.params.url}, function(err, data){
		res.render('wiki',{doc:data[0]})
	});
});

router.get('/edit/:id', function(req, res, next){
	Page.findOne({_id:req.params.id}, function(err, data){
		res.render('edit',{doc:data})
	});
});

var generateUrlName = function(name) {
	  if (typeof name != "undefined" && name !== "") {
	    // Removes all non-alphanumeric characters from name
	    // And make spaces underscore
	    return name.replace(/\s/gi, '_').replace(/\W/ig,'');
	  } else {
	    // Generates random 5 letter string
	    return Math.random().toString(36).substring(2,7);
	  }
  };

router.get('/about', function(req, res, next) {
  res.render('about_us',{title:'WIKISTACK'});
});

router.post('/add/submit', function(req, res) {//change that to router.post('/',function(){})
  var models = require('../models/');
  // STUDENT ASSIGNMENT:
  // add definitions of the `title`, `body` and `url_name` variables here
  var title = req.body.title;
  var body = req.body.content;
  var url_name=generateUrlName(req.body.title);
  var tag = req.body.tag.split(' ');
  var page = new models.Page({ 'title': title, 'body': body, 'url_name': url_name, 'tag':tag});
  page.save();
  res.redirect('/');
});

router.post('/:id/submit', function(req, res, next){
	var title = req.body.title;
  	var body = req.body.content;
  	var url_name=generateUrlName(req.body.title);
  	var tag = req.body.tag.split(' ');
  	// models.Page.create(req.body, function(err, page){}); don't need to use Page.save() with create. Need to use Page.save() with new Page.
  	//create with skip any pre-saved hooks
	Page.update({_id:req.params.id},{ $set:{'title': title, 'body': body, 'url_name': url_name, 'tag':tag}}, function(err, data){
		if (err) return next(err);//if err, stop function, next skips all middleware and go find the middleware with four parameter, which is an error handling middleware
		res.redirect('/');//browser command, different from relative path. relative to root.
	});
});

router.get('/tag/:tag', function(req, res, next){
	Page.find({tag: {$in: [req.params.tag]}}, function(err, data){
		res.render('index',{ title: 'Wikistack - Tag: '+req.params.tag, page:data})
	});
});

module.exports = router;
