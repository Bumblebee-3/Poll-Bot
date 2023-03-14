function deploy() {
  const { SlashCommandBuilder } = require('@discordjs/builders');
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v9');
  const clientId = '1048543886156501022'

  const commands = [
    new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with the bot\'s ping!'),
    new SlashCommandBuilder()
      .setName('poll')
      .setDescription('Create a poll in the server!')
      .addStringOption(option => option.setName('message').setDescription("message of the poll").setRequired(true))
      .addChannelOption(option => option.setName('channel').setDescription('The channel to send the poll into').setRequired(true))
      .addIntegerOption(option =>
        option.setName("options")
          .setDescription("total number of options")
          .setMinValue(2)
          .setMaxValue(10)
          .setRequired(true)
      )
      .addStringOption(option => option.setName('attachment').setDescription("Attachment image link").setRequired(false))
      .addStringOption(option => option.setName('opt1').setDescription("Option 1 of the poll").setRequired(false))
      .addStringOption(option => option.setName('opt2').setDescription("Option 2 of the poll").setRequired(false))
      .addStringOption(option => option.setName('opt3').setDescription("Option 3 of the poll").setRequired(false))
      .addStringOption(option => option.setName('opt4').setDescription("Option 4 of the poll").setRequired(false))
      .addStringOption(option => option.setName('opt5').setDescription("Option 5 of the poll").setRequired(false))
      .addStringOption(option => option.setName('opt6').setDescription("Option 6 of the poll").setRequired(false))
      .addStringOption(option => option.setName('opt7').setDescription("Option 7 of the poll").setRequired(false))
      .addStringOption(option => option.setName('opt8').setDescription("Option 8 of the poll").setRequired(false))
      .addStringOption(option => option.setName('opt9').setDescription("Option 9 of the poll").setRequired(false))
      .addStringOption(option => option.setName('opt10').setDescription("Option 10 of the poll").setRequired(false))
  ]
    .map(command => command.toJSON());

  const rest = new REST({ version: '9' }).setToken(process.env.token);

  rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

}
module.exports = { deploy }