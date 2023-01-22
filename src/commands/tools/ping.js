const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping Information!"),

  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = `API: ${client.ws.ping}\nClient: ${message.createdTimestamp - interaction.createdTimestamp}`;
    await interaction.editReply({
      content: newMessage
    });
  },
};
