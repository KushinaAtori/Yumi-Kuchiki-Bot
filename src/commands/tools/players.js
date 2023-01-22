const { SlashCommandBuilder } = require("discord.js");
const { Pagination } = require("pagination.djs");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("players")
    .setDescription("Grab Aroura Players"),

  async execute(interaction) {
    const pagination = new Pagination(interaction);
    const embeds = [];
    let accounts = [];
    fetch("https://earthmc.net/map/aurora/standalone/dynmap_earth.json")
      .then((response) => response.json())
      .then((data) => {
        accounts = data.players.map((player) => player.account);
        const pagination = new Pagination(interaction);
        const embeds = [];
        const playersPerPage = 15;
        const totalPages = Math.ceil(accounts.length / playersPerPage);

        for (let i = 0; i < totalPages; i++) {
          const newEmbed = new EmbedBuilder().setTitle(`Aroura Players`);
          const startIndex = i * playersPerPage;
          const endIndex = startIndex + playersPerPage;
          const pagePlayers = accounts.slice(startIndex, endIndex).join("\n");
          newEmbed.setDescription("**```" + pagePlayers + "```**");
          embeds.push(newEmbed);
        }

        pagination.setEmbeds(embeds, (embed, index, array) => {
          return embed.setFooter({
            text: `Page: ${index + 1}/${array.length}`,
          });
        });
        pagination.render();
      });
  },
};
