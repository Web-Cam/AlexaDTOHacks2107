/*
	Code By : Cameron Weber, Yogi Schlesinger, Luke Mirman.
	Title: Revit Finder
*/

'use strict';
var Alexa = require("alexa-sdk");
var APP_ID = 'amzn1.ask.skill.31ff6063-80cb-4b93-935f-a7f7761facf2';//enter app Id here 
var date = "9/10/17";
var projectNum = "432784237"
var Size = "50"
//Put more vars here 
var languageStrings = {
    "en": {
        "translation": {
            "SKILL_NAME": "DTOHACKS",
            "HELP_MESSAGE": "Tell me what file you would like information about ",
            "HELP_REPROMPT": "What can I help you with?",
            "STOP_MESSAGE": "Goodbye!"
        }
    }
};


exports.handler = function(event, context) {
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
	'FileList': function() {
        this.emit(':ask', "Here are some of your files" + " ........... Test.RVT" + " ........ Project.rvt"+ " ......... Construction.rvt");
        //this.emit(':ask','Test.rvt <break time="1s"/> Apple <break time="1s"/> Project.RVT');//goes to the get file
    },
	
    'GetFile': function() {
        var fileGet = this.event.request.intent.slots.filename.value;

        if (fileGet == null || fileGet === "undefined" || fileGet == '') { //Alexa doesnt understand the word, so respond with IDK.
            this.emit('Unhandled'); //send to unhandled handler
        } else {
            this.emit(':ask',"your file is ..... "+fileGet + ".....Size is " + Size +".........Date last accessed is....... " + date + " Project Number is ......" + projectNum );
			this.emit('FileInfo');
        // File server function logic goes here!!!
    }},
	'FileInfo': function() {
        SIZE = "50"
		this.emit(':ask', "Here are some of the info on that file")
        this.emit("Filesize is "+ SIZE);
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
        //If the users file  made no sense at all, then output this
                this.emit(':tell', ' Sorry I was unable to find that file ');
    }
};
