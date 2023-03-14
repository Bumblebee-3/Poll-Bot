
const Discord = require("discord.js")
var answered = []
const fs = require("fs")

module.exports = {
  name: 'interactionCreate',
  once: false,
  run(interaction, client) {
      var data = JSON.parse(require("fs").readFileSync(process.cwd() + "/data.json"));
    if (!interaction.isStringSelectMenu()) return;
    for (let a = 0; a < answered.length; a++) {
      if (interaction.user.id == answered[a]) {
        return interaction.reply({ content: "You have already answered!", ephemeral: true })
      }
    }
    if (interaction.customId === 's') {

      for (let a = 0; a < data.length; a++) {
        if (data[a].id == interaction.message.id) {
          data[a].options[interaction.values[0] - 1].votes += 1;
          fs.writeFileSync(process.cwd() + "/data.json", JSON.stringify(data));
          answered.push(interaction.user.id);
          return interaction.reply({ content: "Thanks for answering the poll! Your answer was Option " + interaction.values[0], ephemeral: true })
        }
      }
      interaction.reply({ content: "An Error Occoured!", ephemeral: true })
    }

  }
}