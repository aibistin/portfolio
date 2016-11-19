import { Meteor } from 'meteor/meteor';
import fs from 'fs';
//////
// Globals
//////
/*global Images*/

/* Base Directory For Images */
var baseDir   = process.env.PWD;
var imagesDir =  baseDir + "/public/images";

Meteor.methods({
    getImages: function(){
    //var img = fs.readFileSync('/images');
    var imgLinks = [];
    var images = fs.readdirSync(baseDir + '/images');
     //console.log("Imgages: "+ images.toString());
     images.forEach(function(item,idx){
        if (item.match(/\.(jpe?g|png|gif)$/)){
            imgLinks.push({'imageUrl': '/images/' + item});
        }
     });
     return imgLinks;
 },
});

Meteor.publish('allImages',function(){
    return Images.find({});
});
