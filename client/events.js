import {
    Meteor
}
from 'meteor/meteor';
import moment from 'moment';
//////
// Client Side Portfolio "events" (Not the JavaScript variety of events
//////

//////
// Globals
//////

/*global Events*/
/*global $*/

/*     Template Events */

Meteor.subscribe('allEvents');
//Template Event helpers
//Main Page Template
Template.events.helpers({
    'setAutoFocus': function() {
        return 'autofocus';
    },
    'isAdmin': function() {
        callIsAdminMethod();
        return Session.get('isUserAdmin');
    },
    'allEvents': function() {
        var events = Events.find({});
        /* console.log("Events Count: " + events.count()); */
        return events;
    }
});

//Template display Events helpers
Template.listEvents.helpers({
    'isAdminList': function() {
        callIsAdminMethod();
        return Session.get('isUserAdmin');
    },
    'allEvents': function() {
        var events = Events.find({}, {
            sort: {
                date: 1
            }
        });
        return events;
    },
    'dispDate': function(date) {
        //moment.js
        return moment(date).format("l LT");
    }
});

/* Private functions */
function callIsAdminMethod() {
    Meteor.call('users.isAdmin', function(error, result) {
        if (error) {
            console.log("Error! Checking for Admin rights!! " + error);
        }
        else {
            if (result) {
                Session.set('isUserAdmin', true);
            }
            else {
                Session.set('isUserAdmin', false);
            }
        }
    });
}
//////
// Events
//////

Template.events.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({});
    $('input[name="eventName"]').attr('value', '');
});

Template.events.events({

    'keyup input[name="eventName"]': function(e) {
        $('.js-event-add').removeClass('hidden');
    },
    'submit form[name="addEvent"]': function(e) {
        e.preventDefault();
        var eventData = {
            'name': $('input[name="eventName"]').val(),
            'desc': $('textarea[name="eventDesc"]').val(),
            'date': new Date($('input[name="eventDate"]').val()),
            'createdBy': Meteor.userId(),
            'createdOn': new Date(),
        };

        Meteor.call('events.addEvent', eventData, function(error, result) {
            if (error) {
                throw new Meteor.Error("Error! Adding a new event: " + error.reason);
            }
            else {
                $('input[name="eventName"]').attr('value', '');
            }
        });
        eventData = {};
        $('input[name="eventName"]').val('');
        $('textarea[name="eventDesc"]').val('');
        $('input[name="eventDate"]').attr('value', '');
        $('.js-event-add').addClass('hidden');
    },
});

Template.listEvents.events({
    'click .js-delete-event': function(e) {
        var eventId = $(e.target).attr('id');

        Meteor.call('events.deleteEvent', eventId, function(error, result) {
            if (error) {
                throw new Meteor.Error("Error! Deleting Event Id: " + eventId + "\n" + error.reason);
            }
            else {
                console.log("Deleted Event: " + eventId);
            }
        });

    },

});