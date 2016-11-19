import {
    Meteor
}
from 'meteor/meteor';
//////
// Client Side Portfolio "Home" page
//////

//////
// Globals
//////



//Home page template
Template.home.helpers({
    'isLoggedIn': function() {
        loggedInCheck();
        return Session.get('isUserIn');
    },
    'isNotLoggedIn': function() {
        loggedInCheck();
        return (!Session.get('isUserIn'));
    },
});

//Header page template
Template.header.helpers({
    'isLoggedIn': function() {
        loggedInCheck();
        return Session.get('isUserIn');
    },
    'isNotLoggedIn': function() {
        loggedInCheck();
        return (!Session.get('isUserIn'));
    },
});


/* Private Functions */
function loggedInCheck() {
    Meteor.call('users.isLoggedIn', function(error, result) {
        if (error) {
            console.log("Error! Checking if the user is logged in ! " + error);
        }
        else {
            if (result) {
                console.log("User is logged in ");
                Session.set('isUserIn', true);
            }
            else {
                console.log("You are not logged in !");
                Session.set('isUserIn', false);
            }
        }
    });
}