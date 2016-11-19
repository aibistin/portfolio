import {
  Meteor
}
from 'meteor/meteor';
/*
 * Server Side user Method
 *
 */
//////
// Globals
//////


Meteor.methods({
  'users.isAdmin': function() {
    return _isAdmin();
  },
  'users.isLoggedIn': function() {
    return _isLoggedIn();
  },
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
    throw new Meteor.Error("You are not signed in!");
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