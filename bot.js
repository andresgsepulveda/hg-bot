/* jshint esversion: 6 */
/* global require, console, module, __dirname, setInterval, setTimeout, process */

"use strict";

var Discord = require("discord.js");

var bot = new Discord.Client();

const PREFIX = ">";

var vulgarResponses = [
                    "Holy fuck open the fucking door? @everyone",
                    "HEY FUCKHEAD. DOOR. NOW. @everyone",
                    "Can someone open the fucking door? @everyone",
                    "COME HERE SHITBAG. SOMEONE NEEDS A DOOR OPENING @everyone",
                    "I CHIMED IN WITH A 'HAVEN'T YOU PEOPLE EVER HEARD OF, OPEN THE GODDAMN DOOR, NO?' @everyone",
                    "Fuck. Shit. Ass. Shit. Fuck. Door. @everyone"
];

var afmanCommands = [
                    "Column Left March",
                    "Present Arms",
                    "Forward March",
                    "Order Arms",
                    "Eyes Right",
                    "Ready Front",
                    "Column Right March",
                    "Parade Rest",
                    "Flight, Attention",
                    "Left Flank March",
                    "Right Flank March",
                    "To The Rear March",
                    "Column Half Left March",
                    "Column Half Right March",
                    "Left Step, March",
                    "Right Step, March",
                    "Left Face",
                    "Right Face",
                    "About Face",
                    "Dress Right, Dress",
                    "Cover",
                    "Ready Front"
];

var afmanProCommands = [
                    "Column Left March",
                    "Present Arms",
                    "Forward March",
                    "Order Arms",
                    "Eyes Right",
                    "Ready Front",
                    "Column Right March",
                    "Parade Rest",
                    "Flight, Attention",
                    "Left Flank March",
                    "Right Flank March",
                    "To The Rear March",
                    "Column Half Left March",
                    "Column Half Right March",
                    "Incline 90 degrees, to the Right",
                    "Incline 90 degrees, to the Left",
                    "Incline 45 degrees, to the Left",
                    "Incline 45 degrees, to the Right",
                    "Incline 180 degrees, to the Left",
                    "Open Ranks, March",
                    "Close Ranks, March",
                    "Left Step, March",
                    "Right Step, March",
                    "Close, March",
                    "Extend, March",
                    "Route Step, March",
                    "Dress Right, Dress",
                    "Cover",
                    "Column of Files, from the Right",
                    "Column of Files, from the Left",
                    "Column of Threes",
                    "Ready Front",
                    "Dress Left, Dress",
                    "Eyes, Left",
                    "At Ease, March",
                    "Left Face",
                    "Right Face",
                    "About Face"
];

var mcoCommands = [
                    "Right Shoulder Arms",
                    "Trail Arms",
                    "Port Arms",
                    "Left Shoulder Arms",
                    "Order Arms",
                    "15 Count Manual of Arms",
                    "Inspection Arms"
];

var officerRoster = "Victoria Jackson          - President \n" +
                    "Andres Sepulveda       - Vice President \n" +
                    "Mikeila McCarthy       - Protocol Officer \n" +
                    "Jennifer Hernandez    - Secretary \n" +
                    "Lucas Sottile                - Maintenance Officer \n" +
                    "Adam Winters            - Training Commander \n" +
                    "Brett Inman                  - Activities Officer \n" +
                    "Steven Bloomfield      - Financial Officer \n";

var members = "";
var toReturn = "";
var gameSwitch = 0;
var index = 0;
var innerIndex = 0;

bot.on("ready", function(message) {
    console.log(" ");
    bot.user.setGame("Counter March!");
    gameSwitch++;

    function switchGame()
    {
        if (gameSwitch == 0)
        {
            bot.user.setGame("Ready, hup!");
            gameSwitch++;
        }
        else if (gameSwitch == 1)
        {
            bot.user.setGame("Version 1.6.2");
            gameSwitch++;
        }
        else if(gameSwitch == 2)
        {
            bot.user.setGame("Rewriting my own code...");
            gameSwitch = 0;
        }

    }
    setInterval(switchGame, 1000 * 60);

    bot.channels.get("412453444876500994").send(`$purge <#411700402279415812>`)
    .then(msg => {
        msg.delete(1000 * 10);
    });
    setTimeout(function() {
        bot.channels.get("412453444876500994").send(`$purge <#427504896468713485>`)
        .then(msg => {
            msg.delete(1000 * 10);
        });
    }, 1000 * 90);


    function purgeInterval()
    {
        bot.channels.get("412453444876500994").send(`$purge <#411700402279415812>`)
        .then(msg => {
            msg.delete(1000 * 10);
        });
        setTimeout(function() {
            bot.channels.get("412453444876500994").send(`$purge <#427504896468713485>`)
            .then(msg => {
                msg.delete(1000 * 10);
            });
        }, 1000 * 90);
    }

    //Runs the purge commands every 12 hours once it's initialized.
    setInterval(purgeInterval, (1000 * 60 * 60 * 12));

    var barrierString = "\n ================================================= \n";
    bot.channels.get("412443638560456714").send(barrierString + "HONOR GUARD BOT INITIALIZED\n**VERSION 1.6.2**\nRECENT CHANGES: \n- FIXED ARGUMENT HANDLING ISSUES WITH COMMANDS\n-ADDED AUTO PURGING FUNCTIONALITY FOR EVENT NOTIFICATIONS" + barrierString);
});

bot.on("message", function(message) {

    if (message.author.equals(bot.user)) {return;}

    if (!message.content.startsWith(PREFIX)) {return;}

    var args = message.content.substring(PREFIX.length).trim().split(" ");
    var choice = Math.floor(Math.random());
    members = Array.from(message.guild.members.values());
    switch(args[0].toLowerCase())
    {

        case "door":
            message.delete(1000);
            if (args[1] === "vulgar") {

                choice = Math.floor(Math.random() * 6);
                message.channel.send(vulgarResponses[choice]);
                break;
            }
            message.channel.send("Can someone please open the door? @everyone");
            break;

        case "help":
            message.delete(1000);
            var embed = {
                "title": "Honor Guard Bot Help ",
                "description": "Here is a list of commands and pertinent information regarding the Honor Guard Bot.",
                "color": 0x5D8AA8,
                "fields": [
                    {
                        "name": ">door <vulgar>",
                        "value": "Sends a message to the channel that you would like the door to be open. If the command is given as '>door vulgar', the bot will verbally abuse the chat while asking for the door to be open.\n Example usage: **>door** OR **>door vulgar**"
                    },
                    {
                        "name": ">fde <af/afpro/full/fullpro> <number of commands>",
                        "value": "Auto Generates an FDE. 'af' and 'afpro' generate commands in AFMAN36-2203. 'full' and 'fullpro' generate commands with AF and the MCO P5060.20 Appendix A\n. Example Usage: **>fde af 10**"
                    },
                    {
                        "name": ">help",
                        "value": "Displays this list. List is sent through Direct Message to the user who requests it.\n Example usage: **>help**"
                    },
                    {
                        "name": ">report",
                        "value": "Sends a message for everyone to report accountability. Every person that says the word 'here' in the chat is counted, not counting duplicates. After 30 seconds, the bot will tally up and send out how many people are here. It will also specify who said they were here.\n Example usage: **>report**"
                    },
                    {
                        "name": ">resources <topic>",
                        "value": "Allows the user to get links to documentation and links pertinent to Honor Guard. Specify what you want by adding another word to this command from the following list: af, af-dnc, mc-dnc, facebook, fb, af-hg . \n Example usage: **>resources af-dnc**"
                    },
                    {
                        "name": ">roster <role>",
                        "value": "Sends a roster of people from a specific role. Add another word to this command (officers/actives/trainees/all) to specify which roster of people you want. Rosters are auto-managed as people are added to roles on discord. \n Example usage: **>roster all**"
                    }
                ]
            };
            message.author.send({ embed });
            break;

        case "fde":
            var commands = 0;
            choice = 0;
            try {
                commands = parseInt(args[2]);
            }catch(ParseException) {
                message.channel.send("ERROR, NOT A NUMBER");
                break;
            }
            if(commands > 25) {
                message.channel.send("ERROR: TOO MANY COMMANDS");
            }

            var suggestedTime = 0.5 * commands;

            var i = 0;
            var returnString = " ";

            message.channel.send("Generating FDE..");
            message.channel.send(" ");

            if (args[1] == "af") {
                returnString += "\nTYPE: AIR FORCE\n";
                returnString += `SUGGESTED TIME: ${suggestedTime} MINUTES\n`;
                returnString += "\n=================================\n";

                for (i = 0; i <= commands - 1; i++) {
                    choice = Math.floor(Math.random() * afmanCommands.length);
                    returnString = returnString + afmanCommands[choice].toString() + "\n";
                }
            }
            else if (args[1] == "full") {
                returnString += "\nTYPE: ARMED DRILL\n";
                returnString += `SUGGESTED TIME: ${suggestedTime} MINUTES\n`;
                returnString += "\n=================================\n";

                for (i = 0; i <= commands - 1; i++) {
                    choice = Math.random();
                    //50/50 chance of choosing AFMAN or MCO commands
                    //If it passes this check, choose an air force command
                    if (choice >= 0.3) {
                        choice = Math.floor(Math.random() * afmanCommands.length);
                        returnString = returnString + afmanCommands[choice].toString() + "\n";
                    }
                    else if (choice < 0.3) {
                        choice = Math.floor(Math.random() * mcoCommands.length);
                        returnString = returnString + mcoCommands[choice].toString() + "\n";
                    }
                }
            }
            else if (args[1] == "fullpro") {
                returnString += "\nTYPE: **ADVANCED** ARMED DRILL\n";
                returnString += `SUGGESTED TIME: ${suggestedTime} MINUTES\n`;
                returnString += "\n=================================\n";

                for (i = 0; i <= commands - 1; i++) {
                    choice = Math.random();
                    //50/50 chance of choosing AFMAN or MCO commands
                    //If it passes this check, choose an air force command
                    if (choice >= 0.3) {
                        choice = Math.floor(Math.random() * afmanProCommands.length);
                        returnString = returnString + afmanProCommands[choice].toString() + "\n";
                    }
                    else if (choice < 0.3) {
                        choice = Math.floor(Math.random() * mcoCommands.length);
                        returnString = returnString + mcoCommands[choice].toString() + "\n";
                    }
                }
            }
            else if (args[1] == "afpro") {
                returnString += "\nTYPE: **ADVANCED** AIR FORCE\n";
                returnString += `SUGGESTED TIME: ${suggestedTime} MINUTES\n`;
                returnString += "\n=================================\n";
                for (i = 0; i <= commands - 1; i++) {
                    choice = Math.floor(Math.random() * afmanProCommands.length);
                    returnString = returnString + afmanProCommands[choice].toString() + "\n";
                }
            }
            else if (args[1] != "full" || args[1] != "af" || args[1] != "afpro" || args[1] != "fullpro") {
                message.channel.send("ERROR: Argument 1 is invalid. Command format: '>fde [af/full/afpro/fullpro] [number]'");
            }
            else if (args.length < 3)
            {
                message.channel.send("You didn't put the correct amount of arguments in bud, what's going on?");
                break;
            }
            returnString += "=================================\n";
            message.channel.send(returnString);
            break;

        case "report":
            var index = 0;
            let uidHolder = [];
            let usernameHolder = [];
            const filter = m => {
                let id = m.author.id;
                if (uidHolder.includes(id) || !m.content.startsWith('here')) {
                    return false;
                }
                else {
                    uidHolder.push(id);
                    usernameHolder.push(m.member.nickname);
                    return true;
                }
            };

            message.channel.send("@everyone Report your accountability! Type 'here' to be counted!");
            message.channel.awaitMessages(filter, {
                max: 200,
                time: 1000 * 30,
                errors: ['time']
            })
            .then(collected => {
                console.log("Recieved Message!");
            })
            .catch(collected => {
                message.channel.send(`Accountability is ${collected.size} present and ready for practice.`);
            });
            function printNames() {
                var printout = " ";
                message.channel.send(`Members who are present:`);
                for (index = 0; index < usernameHolder.length; index++)
                {
                    printout = printout + usernameHolder[index] + ", ";
                }
                message.channel.send(printout);
            }
            setTimeout(printNames, 31000);
            break;

        case "resources":
            var toReturn = "";
            if (args.length == 1)
            {
                message.channel.send("You didn't put any arguments in bud, what's going on?");
                break;
            }
            var topic = args[1].toLowerCase();

            function printResources()
            {
                message.channel.send(`Here's what I have about ${topic}! \n` + toReturn);
            }

            if (args.length < 2 || topic == "")
            {
                message.channel.send("You didn't put any arguments in bud, what's going on?");
                break;
            }

            else if (topic == "af-dnc")
            {
                toReturn = "http://static.e-publishing.af.mil/production/1/af_a1/publication/afman36-2203/afman36-2203.pdf";
                topic = "Air Force Drill and Ceremonies Manual (AFMAN36-2203)";
                printResources();
                break;
            }
            else if (topic == "mc-dnc")
            {
                toReturn = "http://www.marines.mil/Portals/59/Publications/MCO%20P5060.20%20W%20CH%201.pdf";
                topic = "Marine Corps Orders P5060.20 Appendix A";
                printResources();
                break;
            }
            else if (topic == "af")
            {
                toReturn = "http://static.e-publishing.af.mil/production/1/af_a1/publication/afi36-2903/afi36-2903.pdf";
                topic = "Air Force Dress and Appearance Standards (AFMAN36-2903)";
                printResources();
                break;
            }
            else if (topic == "af-hg")
            {
                toReturn = "http://static.e-publishing.af.mil/production/1/af_a1/publication/afman34-515/afman34-515.pdf";
                topic = "Air Force Honor Guard Manual (AFMAN 34-515)";
                printResources();
                break;
            }
            else if (topic == "facebook" || topic == "fb")
            {
                toReturn = "https://www.facebook.com/NAUHonorGuard/";
                topic = "NAU Honor Guard Facebook Page";
                printResources();
                break;
            }
            else
            {
            	message.channel.send(`Sorry! I can't find anything on ${topic}. Hopefully it'll be added to my library soon!`);
            	break;
            }
            break;

        case "roster":
            toReturn = "";
            var toAdd = "", tempString = "";
            var tempStorage;
            if(args[1] == "actives")
            {
                var activeRole = message.guild.roles.find("name", "Active");
                var actives = [];
                innerIndex = 0;
                for (index = 0; index < members.length; index++)
                {
                    if (members[index].roles.has(activeRole.id))
                    {
                        actives.push(members[index].nickname);
                    }
                }
                actives.sort();
                for (index = 0; index < actives.length; index++)
                {
                    tempStorage = actives[index].split(" ");
                    tempString = tempStorage[tempStorage.length - 1] + ", ";
                    for (innerIndex = 0; innerIndex < tempStorage.length - 1; innerIndex++)
                    {
                        tempString += tempStorage[innerIndex] + " ";
                    }
                    actives[index] = tempString;
                }
                actives.sort();
                for (index = 0; index < actives.length; index++)
                {
                    toAdd = actives[index];
                    toReturn += toAdd + "\n";
                }
                message.channel.send("Here's a list of all our actives: \n");
                var countString = `\n Total Actives: ${actives.length} \n\n`;
                message.channel.send(countString + toReturn);
                break;

            }
            else if (args[1] == "officers")
            {
                message.channel.send("Here's a list of our officers and their positions!");
                var embed = {
                    "title" : "Officers of the Honor Guard",
                    "description" : "Here's a list of all our officers!",
                    "color" : 0x58DAA8,
                    "fields" : [
                        {
                            "name" : "President - Victoria Jackson",
                            "value" : "Grandfathered Alumni"
                        },
                        {
                            "name": "Vice President - Andres Sepulveda",
                            "value" : "AS200, AFROTC"
                        },
                        {
                            "name" : "Protocol Officer - Mikeila McCarthy",
                            "value" : "AS100, AFROTC"
                        },
                        {
                            "name" : "Secretary - Jennifer Hernandez",
                            "value" : "AS100, AFROTC"
                        },
                        {
                            "name" : "Maintenance Officer - Lucas Sottile",
                            "value" : "AS100, AFROTC"
                        },
                        {
                            "name" : "Training Officer - Adam Winters",
                            "value" : "AS100, AFROTC"
                        },
                        {
                            "name" : "Activities Officer - Brett Inman",
                            "value" : "AS200, AFROTC"
                        },
                        {
                            "name" : "Financial Officer - Steven Bloomfield",
                            "value" : "AS300, AFROTC"
                        }
                    ]
                };
                message.channel.send({ embed });
                break;
            }
            else if(args[1] == "trainees")
            {
                var traineeRole = message.guild.roles.find("name", "Trainee");
                var trainees = [];
                var innerIndex = 0;
                for (index = 0; index < members.length; index++)
                {
                    if (members[index].roles.has(traineeRole.id))
                    {
                        trainees.push(members[index].nickname);
                    }
                }
                trainees.sort();
                for (index = 0; index < trainees.length; index++)
                {
                    tempStorage = trainees[index].split(" ");
                    tempString = tempStorage[tempStorage.length - 1] + ", ";
                    for (innerIndex = 0; innerIndex < tempStorage.length - 1; innerIndex++)
                    {
                        tempString += tempStorage[innerIndex] + " ";
                    }
                    trainees[index] = tempString;
                }
                trainees.sort();
                for (var index = 0; index < trainees.length; index++)
                {
                    toAdd = trainees[index];
                    toReturn += toAdd + "\n";
                }
                message.channel.send("Here's a list of all our trainees: \n");
                var countString = `\n Total Trainees: ${trainees.length} \n\n`;
                message.channel.send(countString + toReturn);
                break;
            }
            else if (args[1] == "all")
            {
                var traineeRole = message.guild.roles.find("name", "Trainee");
                var trainees = [];
                for (var index = 0; index < members.length; index++)
                {
                    if (members[index].roles.has(traineeRole.id))
                    {
                        trainees.push(members[index].nickname);
                    }
                }
                trainees.sort();
                for (index = 0; index < trainees.length; index++)
                {
                    tempStorage = trainees[index].split(" ");
                    tempString = tempStorage[tempStorage.length - 1] + ", ";
                    for (innerIndex = 0; innerIndex < tempStorage.length - 1; innerIndex++)
                    {
                        tempString += tempStorage[innerIndex] + " ";
                    }
                    trainees[index] = tempString;
                }
                trainees.sort();
                for (var index = 0; index < trainees.length; index++)
                {
                    toAdd = trainees[index];
                    toReturn += toAdd + "\n";
                }
                var countString = `\n Total Trainees: ${trainees.length} \n`;
                countString += toReturn;

                // Prepping the active list.
                var activeRole = message.guild.roles.find("name", "Active");
                var actives = [];
                for (var index = 0; index < members.length; index++)
                {
                    if (members[index].roles.has(activeRole.id))
                    {
                        actives.push(members[index].nickname);
                    }
                }
                actives.sort();
                for (index = 0; index < actives.length; index++)
                {
                    tempStorage = actives[index].split(" ");
                    tempString = tempStorage[tempStorage.length - 1] + ", ";
                    for (innerIndex = 0; innerIndex < tempStorage.length - 1; innerIndex++)
                    {
                        tempString += tempStorage[innerIndex] + " ";
                    }
                    actives[index] = tempString;
                }
                actives.sort();
                for (var index = 0; index < actives.length; index++)
                {
                    toAdd = actives[index];
                    toReturn += toAdd + "\n";
                }

                var countStringTwo = `\n Total Actives: ${actives.length} \n`;
                countStringTwo += toReturn;

                message.channel.send("Here's a list of everyone we have: \n");
                var totalForce = actives.length + trainees.length;
                var totalString = `Total Force for Honor Guard: ${totalForce} \n`;
                message.channel.send(totalString + countStringTwo + countString);
                break;
            }
            else if (args.length < 2)
            {
                message.channel.send("You didn't put any arguments in bud, what's going on?");
                break;
            }
            else
            {
                message.channel.send("I don't have any rosters about that. Try again with some of these words: officers, actives, trainees");
                break;
            }
            break;

        default:
            message.channel.send("I don't understand what to do with that command. Please use >help to get a list of possible commands to give me!");
            break;
        }
});


bot.login(process.env.BOT_TOKEN);
