const {Discord, Intents, Client} = require("discord.js"); const fs = require("fs"); const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }); bot.login("OTMxOTgwOTY5MTczNDUwODQy.YeMU6g.eAFynphDx7SF30fZrI3wceg7TBI"); let logPath = "./logs/"; let log; let logJSON; let now = new Date; let dateString = "ChatLog " + now.getDate() + "," + (now.getMonth() + 1) + "," + now.getFullYear(); bot.on("ready", () => { console.log("j"); try{ log = fs.readFileSync(logPath + dateString + ".json"); logJSON = JSON.parse(log); } catch{ fs.writeFileSync(logPath + dateString + ".json", '{"messageArray": []}'); log = fs.readFileSync(logPath + dateString + ".json"); logJSON = JSON.parse(log); }}); bot.on("messageCreate", (msg) => { let editedMsg = msg; delete editedMsg.system; delete editedMsg.webhookId; delete editedMsg.groupActivityApplicationId; delete editedMsg.applicationId; delete editedMsg.activity; delete editedMsg.flags; delete editedMsg.reference; delete editedMsg.interaction; delete editedMsg.cleanContent; logJSON.messageArray.push(editedMsg); fs.writeFileSync( "" + logPath + dateString + ".json", JSON.stringify(logJSON, null, 4)); }); setInterval(() => { let newNow = new Date; if(now.getDate != newNow.getDate) { now = new Date; dateString = "ChatLog " + now.getDate() + "," + (now.getMonth() + 1) + "," + now.getFullYear(); fs.writeFileSync(logPath + dateString + ".json", '{"messageArray": []}'); log = fs.readFileSync(logPath + dateString + ".json"); logJSON = JSON.parse(log);} }, 1000)