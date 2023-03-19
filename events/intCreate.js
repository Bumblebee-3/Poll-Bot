
const Discord = require("discord.js")
const fs = require("fs")

module.exports = {
  name: 'interactionCreate',
  once: false,
  run(interaction, client) {
    var udata = JSON.parse(require("fs").readFileSync(process.cwd() + "/userData.json"));
    var data = JSON.parse(require("fs").readFileSync(process.cwd() + "/data.json"));
    var n=0;
    if (!interaction.isStringSelectMenu()) return;
    for (let u=0;u < udata.length;u++){
      if(udata[u].id==interaction.message.id){
        n=u;
        for (let a = 0; a < udata[u].users.length; a++) {
      if (interaction.user.id == udata[u].users[a]) {
        return interaction.reply({ content: "You have already answered!", ephemeral: true })
      }
    }
      }
    }
    
    if (interaction.customId === 's') {

      for (let a = 0; a < data.length; a++) {
        if (data[a].id == interaction.message.id) {
          data[a].options[interaction.values[0] - 1].votes += 1;
          fs.writeFileSync(process.cwd() + "/data.json", JSON.stringify(data));
          udata[n].users.push(interaction.user.id);
          fs.writeFileSync(process.cwd() + "/userData.json", JSON.stringify(udata));

          return interaction.reply({ content: "Thanks for answering the poll! Your answer was Option " + interaction.values[0], ephemeral: true })
        }
      }
      interaction.reply({ content: "An error occoured!", ephemeral: true })
    }

  }
}