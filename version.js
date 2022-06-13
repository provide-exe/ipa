/*
┌──────────────────────────────────────────┐
│       Created by: provide#5793           │
│        Discord Name: Provide             │
└──────────────────────────────────────────┘*/

/** Discord Shit  */
const { Collection, Client, MessageEmbed } = require('discord.js');
const { Webhook, MessageBuilder } = require("discord-webhook-node");
/** Discord Shit  */

/** NPM Packages */
const config = require("./config.json");
require('discord-inline-reply');
const colors = require("colors");
const os = require("os");
const request = require("request");
const fs = require("fs");
/** NPM Packages */

/**  Inportant shit. */
const verison = "12.2.0";
const computerName = os.hostname();
/**  Inportant shit. */

/** For the bot to run  */
const client = new Client({
    disableEveryone: true,
    partials: ['MESSAGE', "REACTION", "CHANNEL"]
});

module.exports = client;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);

});
/** For the bot to run  */

async function checkLicense() {
    if (config.licenseKey === "license") {
        client.on("ready", async (message) => {
            request("https://raw.githubusercontent.com/provide-exe/ipa/main/version.js?token=GHSAT0AAAAAABTEOIX3365L3CUEZ6BLFC4AYVGVDLQ", function(error, response, body) {
                const verison = "1.0.1"

                if (error) { console.log("[Updater]".blue, "An error occured while checking for updates.".red) }        
                if (body.includes(verison)) {
                    console.log("\n[Updater]".blue, "You are running the latest version of our bot.".white)
                    return;
                } else {
                    console.log("\n[Updater]".blue, "A new version of our bot is available. Downloading all needed assets.".white)
                    request("https://raw.githubusercontent.com/provide-exe/ipa/main/index.js?token=GHSAT0AAAAAABTEOIX3DJBLLUDECCIA722KYVGUXVQ", function(error, response, body) {
                        if (error) { console.log("[Updater]".blue, "An error occured while checking for updates.".red) }
                        fs.writeFileSync("./index.js", body);
                        console.log("[Updater]".blue, "All needed updates was downloaded.".white)
                        process.exit(1);
                    });   
                }
            });
            console.log(" ████████╗██████╗  █████╗ \n ╚══██╔══╝██╔══██╗██╔══██╗\n    ██║   ██████╔╝███████║\n    ██║   ██╔═══╝ ██╔══██║\n    ██║   ██║     ██║  ██║\n    ╚═╝   ╚═╝     ╚═╝  ╚═╝".cyan)
            console.log("Made by provide -".white, "Discord | Provide#5793".cyan)
            console.log(`${client.user.username} has booted and is online. Running on`.green, `${computerName}`)
        });
    } else {
        console.log(" ████████╗██████╗  █████╗ \n ╚══██╔══╝██╔══██╗██╔══██╗\n    ██║   ██████╔╝███████║\n    ██║   ██╔═══╝ ██╔══██║\n    ██║   ██║     ██║  ██║\n    ╚═╝   ╚═╝     ╚═╝  ╚═╝".cyan)
        console.log("Made by provide -".white, "Discord | Provide#5793\n".cyan)
        console.log("[License Check]".underline, "The license key that was provided, is invaild. Please enter a valid license key.".yellow, "\n[License]".underline, "Exiting out of the application in the next 5 seconds.");
        console.log("[Internal Error]".red, "Attempted to run on".yellow, "-".white, "Host Name:".brightCyan, `${computerName}`)
        
        /** Notifing Provide#5793 */
        const hook = new Webhook("https://discord.com/api/webhooks/985273568264876043/JajP10RN2DgTH5Sf81l5ebYMkHWkc6GWeM5FxgIwTrz83PWT7LlghONokXI1JmiDg48u");
        const IMAGE_URL = "https://i.pinimg.com/550x/74/7a/b9/747ab93fe0d24d7484803b0b3b2b40dc.jpg";

        const webhookSend = new MessageBuilder()
        .setTitle(`${computerName} has booted up ${config.settings.botName}`)
        .setDescription(`**Bootup Status:** \`Unsuccessful\`\n**License Key:** ${config.licenseKey}\n**Bot Name:** ${config.settings.botName}\n**Directory:** ${__dirname}\n**Reasoning** An invaild license key was entered.`)
        .setColor("#ff0000")
        .setFooter("Skids | Made by provide#5793", "https://i.pinimg.com/550x/74/7a/b9/747ab93fe0d24d7484803b0b3b2b40dc.jpg");
        
        hook.setUsername("Skids - Notifications");
        hook.setAvatar(IMAGE_URL);
        hook.send(webhookSend);

        setInterval(() => {
            process.exit(1);
        }, 5000);
    }
}

async function licenseExpire() {
    const expirationDate = new Date("December 17, 2023 03:24:00")
    const currentDate = new Date();

    if (currentDate > expirationDate) {
        setInterval(() => {
            console.log("\n[License Expired]".brightBlue, "Your license key has expired. Your access to our product has been denied.".yellow)
        }, 2000);

        setInterval(() => {
            process.exit(1);
        }, 3000)
    }
}

licenseExpire();
checkLicense();
