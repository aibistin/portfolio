import {Meteor} from 'meteor/meteor';
/*
 * Main Library Module
 * Loads Mongo collections
 *
 */
 
//////
// Globals
//////
/*global Images*/
/*global Events*/

Images = new Mongo.Collection("images");

Events = new Mongo.Collection("events");