module.exports = {
	name: "ping",
	description: "Get the bot ping",
	async run(interaction, client) {
		interaction.reply({ content: client.ws.ping.toString() + 'ms' });
	}
}