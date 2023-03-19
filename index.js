const fs = require("fs")
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const website = require("./website/index.js")
website.loadSite()

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});
client.commands = new Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.run(...args, client));
  } else {
    client.on(event.name, (...args) => event.run(...args, client));
  }
}

client.login(process.env.token || require("./config.json").token);

require("./deployCommands.js").deploy()

var data =fs.readFileSync(process.cwd() + "/data.json");
console.log(JSON.parse(data))