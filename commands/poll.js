const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const ids = require("../config.json").ids;
const fs = require("fs")

var data = JSON.parse(require("fs").readFileSync(process.cwd() + "/data.json"));



module.exports = {
  name: "poll",
  description: "Creates a poll in the server.",
  async run(interaction, client) {
    for (let i = 0; i < ids.length; i++) {
      if (interaction.user.id == ids[i]) {
        const msg = interaction.options.getString('message');
                const messageL = interaction.options.getString('message');

        const channel = interaction.options.getChannel('channel');
        const attachment = interaction.options.getString('attachment');
        const options = interaction.options.getInteger('options');
        let opts = [];
        let custom_options = [];
        let fields = [];
        for (let i = 1; i <= options; i++) {
          if (!interaction.options.getString('opt' + i)) {
            return interaction.reply({ content: `Specified ${options} options, but option ${i} was not provided!`, ephemeral: true })
          }
          else {
            opts.push({ pos: i, data: interaction.options.getString('opt' + i), votes: 0 })
            fields.push({
              name: 'Option ' + i,
              value: interaction.options.getString('opt' + i),
            })
            custom_options.push({
              label: `Option ${i}`,
              description: interaction.options.getString('opt' + i),
              value: `${i}`,
            })

          }
        }
        const embed = {
          color: 0x0099ff,
          title: 'New Poll!',
          author: {
            name: interaction.user.username,
            icon_url: interaction.user.avatarURL,
          },
          description: msg,

          fields: fields,
          timestamp: new Date().toISOString()
        };
        if (attachment) {
          embed.image = {
            url: attachment
          }
        }
        const row = new ActionRowBuilder()
          .addComponents(
            new StringSelectMenuBuilder()
              .setCustomId('s')
              .setPlaceholder('Select a Answer')
              .addOptions(custom_options),
          );

        channel.send({ embeds: [embed], components: [row] }).then(msg => {
          data.push({
            id: `${msg.id}`,
            channel: `${channel.id}`,
            msg:messageL,
            options: opts,
            attachment:attachment||"null"
          })
          var udata = JSON.parse(require("fs").readFileSync(process.cwd() + "/userData.json"));
          udata.push({"id":msg.id,"users":[interaction.user.id]})
          console.log(data)
          fs.writeFileSync(process.cwd() + "/data.json", JSON.stringify(data));
          fs.writeFileSync(process.cwd() + "/userData.json", JSON.stringify(udata));

          msg.startThread({
            name: 'Poll Talk',
	          autoArchiveDuration: 60*24,
	          reason: 'Discuss about today\'s poll here!'
          })
          embed.url=require("../config.json").baseLink+msg.id
          msg.edit({ embeds: [embed],components:[row] });

        })


        interaction.reply({ embeds: [embed], components: [row] });
      }
      else {
        interaction.reply({ content: 'You are not authorized for this command!', ephemeral: true })
      }
    }
  }
}