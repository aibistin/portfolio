import {Meteor} from 'meteor/meteor';
import fs from 'fs';
/*
 * Main Library Module
 * Initialize databases if necessary.
 *
 */
 
//////
// Globals
//////
/*global Images*/
/*global Events*/


/* Base Directory For Images */
var baseDir   = process.env.PWD;
var imagesDir =  baseDir + "/public/images";
/*
  var bD = fs.realpathSync(process.cwd());
  console.log("BD: " + bD);
*/

/* Password is test123 */
var adminUser =  { 
  "services" : { "password" : { "bcrypt" : "$2a$10$C1jKfzy4FnZ1T4j3LY8mR.Y8n11/f04BqajMb2.FEvtm.nP48iRGO" }, }, 
  "emails" : [ { "address" : "admin@test.com", "verified" : false } ],
  "roles"  : [ 'blogAdmin','blogAuthor','siteAdmin'],
  "profile" : {  } 
};

var regUser =  { 
  "services" : { "password" : { "bcrypt" : "$2a$10$C1jKfzy4FnZ1T4j3LY8mR.Y8n11/f04BqajMb2.FEvtm.nP48iRGO" }, }, 
  "emails" : [ { "address" : "test@test.com", "verified" : false } ],
  "roles"  : [ 'blogAuthor'],
  "profile" : {  } 
};


//////
// Load: Public images at startup
//       Admin and a regular user.
//////
Meteor.startup(function(){
    
    if(!Images.findOne()){
        console.log("Base Dir: " + baseDir);
        console.log("Img Dir: " + imagesDir);
        
        var images = fs.readdirSync(imagesDir);
        var imgRx = new RegExp(/(.+)\.(jpe?g|png|gif)$/);
         images.forEach(function(item,idx){
         //if (item.match((.+)/\.(jpe?g|png|gif)$/)){
         if (imgRx.test(item)){
            var bases = imgRx.exec(item);
            Images.insert({'imageUrl':'/images/' + item, name: bases[1]});
         }
     });
    }
    
    /* Insert an admin add a regular user */
    if (!Meteor.users.findOne()){
        Meteor.users.insert(adminUser);
        Meteor.users.insert(regUser);
    }
});

    

