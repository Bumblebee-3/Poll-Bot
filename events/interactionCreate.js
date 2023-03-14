
const Discord = require("discord.js")

module.exports = {
  name: 'interactionCreate',
  once: false,
  run(interaction, client) {
    if (!interaction.isCommand()) return;

    const commandName = interaction.commandName
    const command = client.commands.find(cmd => cmd.name == commandName);
    if (command) {
      return command.run(interaction, client);
    }
    else {
      return interaction.reply({ ephemeral: true, content: "Oops, an error occoured!" })
    }
  }
}