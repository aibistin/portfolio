import {
  Meteor
}
from 'meteor/meteor';
/*
 * Server Side Events(Not of the JavaScript variety)  Handler
 *
 */
//////
// Globals
//////
/*global SimpleSchema*/
/*global Events*/

// Define the schema
const EventSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 200
  },
  desc: {
    type: String,
    label: "Desc",
    max: 300
  },
  date: {
    type: Date,
    label: "Date of event!"
  },
  createdOn: {
    type: Date,
    label: "Created On Date"
  },
  createdBy: {
    type: String,
    label: "Created By",
    max: 100
  }
});


Meteor.methods({
  'events.addEvent': function(eventData) {

    var eSchemaContext1 = EventSchema.namedContext("addEvent");

    var isValid = eSchemaContext1.validate(eventData);
    if (!_isAdmin()) {
      throw new Meteor.Error("You are not an Admin!");
    }

    check(eventData, EventSchema);
    if (isValid) {
      console.log("Valid Event To Add: " + eventData.toString());
      Events.insert(eventData);
    }
    else {
      console.log("Drat! Add Event form is invalid! " + eSchemaContext1.invalidKeys());
    }
  },
  'events.deleteEvent': function(eventId) {
    if (!_isAdmin()) {
      throw new Meteor.Error("You are not an Admin!");
    }
    console.log("Deleting Event: " + eventId);

    Events.remove({
      _id: eventId
    });

  }
});

Meteor.publish('allEvents', function() {
  return Events.find({});
});

/* Private Functions */
function _isLoggedIn() {
  if(Meteor.userId()){
    return true;
  }
  return false;
}

function _isAdmin() {
  var uId = Meteor.userId();
  if (!uId) {
    console.log("You must log on!");
  }
  var user = Meteor.users.findOne({
    _id: uId
  });

  if (!user) {
    throw new Meteor.Error("Error finding user account!");
  }

  if (user.roles.indexOf('siteAdmin') === -1) {
    return false;
  }
  return true;
}
