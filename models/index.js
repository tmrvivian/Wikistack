var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack');//create a database connnection

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));//output standard error output, wont stop the process, serves the same purpose as console log

var pageSchema = new mongoose.Schema({//schema is a contructor function
	title: String,
	url_name: String,
  owner_id: String,
  body:     String,
  date:     { type: Date, default: Date.now },//set default
  status:   Number,
  tag:[]
});

pageSchema.virtual('full_route').get(function(){
 return '/wiki/'+ this.url_name;//"/"-absolute path, 'wiki/'- relative path
});

var userSchema = new mongoose.Schema({
  name:  { first: String, last: String },
  email: String
});

var Page = mongoose.model('Page', pageSchema);//model creates a model, builds a model with a particular name with a particular schema.
//model can also retrieve a model without the model being exported previously
/*var Page = momgoose.model('Page')*/
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};