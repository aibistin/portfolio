import { meteor } from 'meteor/meteor';
/*global Router*/
/*global hljs*/
/*TODO put this in a better place!
  Used for syntax hilighting.
*/
hljs.initHighlightingOnLoad();

Router.configure({
  layoutTemplate: 'layout',
});

/* Portfolio page */
Router.route('/', function () {
  this.render('home');
});

Router.route('/home', function () {
  this.render('home');
});

/* Alternate Portfolio page */
Router.route('/portfolio', function () {
  this.render('home');
});

Router.route('/events', function () {
  this.render('events');
});

Router.route('/media', function () {
  this.render('media');
});
Router.route('/resume', function () {
  this.render('resume');
});

/* Alternate BlogIndex page */
Router.route('/my_blogs', function () {
  this.render('myBlogIndexTemplate');
});

Router.route('/blog', function () {
  this.render('myBlogIndexTemplate');
});


