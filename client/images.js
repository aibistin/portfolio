import { Meteor } from 'meteor/meteor';
/*global Images */
/*global $ */
//////
// Client Side images
//////

Meteor.subscribe('allImages');
//Template Event helpers
Template.allImages.helpers({
    'allImages': function(){
        //var images =  Images.find({sort: {name: 1}});
        var images =  Images.find({});
        console.log("images count: " + images.count());
        return images;
        //return Session.get('allImages');
    },
    'formatDate' : function (dateStr){
        return formatDateBasic(dateStr);
    },
});

var firstIter;
Template.carouselImgs.helpers({
    'resetCarousel' : function(){
        firstIter = true; //Need to reset this to re-display images
    },
    'allImages': function(){
        var images =  Images.find({});
        return images;
    },
    'isFirstIteration': function(){
        if (firstIter){
            firstIter = false;
            return true;
        }
        return false;
    },
    'formatDate' : function (dateStr){
        return formatDateBasic(dateStr);
    },
});



//////
// Utility Subs
//////
function formatDateBasic(dateStr){
    /* YYYYMMDD_HHMMSS */
    var dateRx = new RegExp(/^([12][09]\d\d)([01][0-9])([0-3][0-9])_(\d\d)(\d\d)(\d\d)$/);
    var newDateStr,newTimeStr;
    if (dateRx.test(dateStr)){
        var dateParts = dateRx.exec(dateStr);
        newDateStr= dateParts[1] + "-" + dateParts[2] + "-" + dateParts[3];
        newTimeStr= dateParts[4] + ":" + dateParts[5] + ":" + dateParts[6];
    }
    else{
        console.log("Doesn't look like a date string: " + dateStr);
        return dateStr;
    }
    return newDateStr + " " + newTimeStr;
}

Template.carouselImgs.helpers({
    'allImages': function(){
        //var images =  Images.find({sort: {name: 1}});
        var images =  Images.find({});
        return images;
    },
    'isFirstIteration': function(){
        if (firstIter){
            firstIter = false;
            return true;
        }
        return false;
    },
    'formatDate' : function (dateStr){
        return formatDateBasic(dateStr);
    },
});

//////
// Events
//////

Template.carouselImgs.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      console.log('Template onLoad');
    }
    
    $('#home-photo-carousel').carousel({
       interval: 4000
    }); 
    
};