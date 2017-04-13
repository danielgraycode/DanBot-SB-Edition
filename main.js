/*Copyright (c) 2017 Daniel Gray
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


//Yes its a lot but lets load all our modules. If it doesn't work, try installing the part in the require("HERE") part using npm install PACAKAGENAME --save
const discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const client = new discord.Client();
const config = require("./config.json")
const version = "V1.0.0"
const footermessage = `DanBot:SB Edition, ${version}`

//Removes all @everyones from the text inputted when called.
function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

//Thanks I like to catch errors
process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: \n" + err.stack);
});

//To make sure stuff works
client.on('ready', () => {
  console.log("Bot is online!");
  setInterval(function(){client.user.setGame(`danielgray.me`, `github.com/danielgraycode`); }, 500);
});

//And lets get rigghthtttt intoooo theeeeeeee MESSAGES
client.on('message', (message) => {
  let args = message.content.split(" ").slice(1);
  let usermessage = message.content.toLowerCase()
  if (message.author.id !== client.user.id) return;
  if (message.author.id === client.user.id) {
  if (usermessage == config.prefix + "areyoualive?") {
    message.channel.sendMessage("", {
      embed: {
        title: "Am I alive?",
        color: 0x06DF00,
        description: "Yes, I am still alive!",
        footer: {
          icon_url: client.avatarURL,
          text: "DanBot:SB Edition, " + version
        }
      }
    });
  };

  //A bot is not a bot without an eval command. BE CAREFUL WITH THIS
        if (message.author.id === config.ownerid) {
        if (usermessage.startsWith(config.specialPrefix + "eval")) {
            try {
                var code = args.join(" ");
                var evaled = eval(code);

                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled);

                message.channel.sendMessage("", {
                  embed: {
                    title: "Eval",
                    color: 0x06DF00,
                    fields: [{
                      name: "Input",
                      value: message.content
                    }, {
                      name: "Output",
                      value: evaled
                    }],
                    footer: {
                      icon_url: client.avatarURL,
                      text: "DanBot:SB Edition, " + version
                    }
                  }
                });
            } catch (err) {
                message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            }
        }
      }

  //Leave this command in here or you will be copyright claimed!!
  if (usermessage == config.prefix + "credits") {
    message.channel.sendMessage("", {
      embed: {
        title: "Credits?",
        color: 0x06DF00,
        description: "This bot was made by Daniel Gray. You can find him here: [danielgray.me](https://danielgray.me)",
        footer: {
          icon_url: client.avatarURL,
          text: "DanBot:SB Edition, " + version
        }
      }
    });
  };

 if (usermessage == config.prefix + "stats") {
        message.channel.sendMessage("", {
            embed: {
                color: 3447003,
                title: 'Stats',
                description: 'Here are the stats for DanBot!',
                fields: [{
                    name: 'Uptime',
                    value: `${moment.duration(client.uptime).format("D [days], H [hrs], m [mins], s [secs]")}`
                }, {
                    name: 'I am in: ',
                    value: `${client.guilds.size} Servers`
                }, {
                    name: 'Serving: ',
                    value: `${client.users.size} Users!`
                }, {
                    name: 'I am currently using: ',
                    value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
                }, {
                    name: 'Discord.js Version',
                    value: `${discord.version}`
                }],
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "DanBot:SB Edition, " + version
                }
            }
        });
    };

    if (usermessage.startsWith(config.prefix + "profile")) {
      let usr;
      if(args.length == 0) {
        usr = message.author;
      } else if(message.mentions.users.size == 0) {
        message.channel.sendMessage("", {
          embed: {
            color: 0xff0000,
            title: "Error!",
            description: "You didn't mention a user!",
            footer: {
              icon_url: client.user.avatarURL,
              text: "DanBot:SB Edition, " + version
            }
          }
        })
      } else { usr = message.mentions.users.first();}
      if(usr != undefined) {
        message.channel.sendMessage("", {
          embed: {
            title: "User info: " + usr.username,
            color: 0x06DF00,
            fields: [{
              name: "Username",
              value: `${usr.username}#${usr.discriminator}`
            }, {
              name: "Joined Discord: ",
              value: `${usr.createdAt}`
            }],
            footer: {
              icon_url: client.user.avatarURL,
              text: "DanBot:SB Edition, " + version
            },
            thumbnail: {
              height: 100,
              width: 100,
              url: usr.avatarURL
            }
          }
        })
      }
    }



    if (usermessage == config.prefix + "help") {
      message.channel.sendMessage("", {
        embed: {
          color: 0x06DF00,
          title: "DanBot:SB Edition- Help!",
          description: "Here are the commands!",
          fields: [{ 
            name: `${config.prefix}eval`,
            value: "A special owner only command which lets him do magical stuff :)"
          }, { 
            name: `{config.prefix}profile @ <person>`,
            value: "Gives user info on a specified person."
            }, {
            name: `${config.prefix}stats`,
            value: "Gives current starts on the bot, things like RAM usage, server count and more!"
            }, {
            name: `{config.prefix}credits`,
            value: "A simple command that shows the developer of DanBot:SB Edition and where you can find him."
            }, {
            name:  `${config.prefix}areyoualive?`,
            value: "Are you alive?? To be, or not to be, that is the question."
            }, {
            name:  `${config.prefix} warn?`,
            value: "Warns a user."
            }
          ],
          footer: {
            icon_url: client.avatarURL,
            text: "DanBot:SB Edition, " + version
          }
        }
      });
    }

    if (usermessage.startsWith("dbwarn")) {
      let strikingmember = message.author;
      let reason = message.content.split(" ").slice(2);
      let user;
      if(message.mentions.users.size == 0) {
        message.channel.sendMessage("", {
          embed: {
            color: 0xff0000,
            title: "Error!",
            description: "You did not mention a user to warn.",
            footer: {
              icon_url: client.user.avatarURL,
              text: "DanBot:SB Edition, " + version
            }
          }
        });
      }
      else {user = message.mentions.users.first();}
      if(user != undefined) {
         message.channel.sendMessage("", {
          embed: {
            color: 0xff0000,
            title: "Warning!",
            description: `${user} has been warned by ${strikingmember}! \n Reason: ${reason}`,
            footer: {
              icon_url: client.user.avatarURL,
              text: "DanBot:SB Edition, " + version
            }
          }
        });
      }


    }
  }



  });


client.login(config.botToken);
