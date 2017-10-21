/*
	Code By : Cameron Weber, Yogi Schlesinger
	Title: Revit Finder
*/

'use strict';
var Alexa = require("alexa-sdk");
var request = require('request');
var APP_ID = 'amzn1.ask.skill.9e9acde3-0a41-4c7e-a9b2-aea5730bbbc8';//enter app Id here 

var languageStrings = {
    "en": {
        "translation": {
            "SKILL_NAME": "Revit finder",
            "HELP_MESSAGE": "Tell me what file you would like information about ",
            "HELP_REPROMPT": "What can I help you with?",
            "STOP_MESSAGE": "Goodbye!"
        }
    }
};


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function() {
        this.emit(':ask', "Welcome to Revit Finder, Say your filename, and I will tell you infomation about it");
        this.emit('getFile');//goes to the get file
    },
	
    'GetFile': function() {
        var fileGet = this.event.request.intent.slots.filename.value;

        if (fileGet == null || fileGet === "undefined" || fileGet == '') { //Alexa doesnt understand the word, so respond with IDK.
            this.emit('Unhandled'); //send to unhandled handler
        } else {
            
        // File server function goes here!!!
    },
    'AMAZON.HelpIntent': function() {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_REPROMPT");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'Unhandled': function() {
        console.log("UNHANDLED");
        //If the users sentence really made no sense at all, then just choose a random word to finish with
                this.emit(':tell', ' Sorry I was unable to find that file ');
            }
        });
    }
};

