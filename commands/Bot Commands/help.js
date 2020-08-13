const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const config = require("../../src/config.js")

module.exports = {
    name: "도움말",
    aliases: ["h", "도움말", "도움", "ㅗ디ㅔ"],
    category: "Bot Commands",
    description: "도움말",
    usage: "[command name | 다른 사용법]",
    run: async (client, message) => {
        const embed = new MessageEmbed()
            .setColor("RANDOM")

        const commands = (category) => {
            return client.commands
                .filter(cmd => cmd.category === category)
                .map(cmd => `\`${config.prefix}${cmd.name}\``)
                .join(", ");
        }

        const info = client.categories
            .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
            .reduce((string, category) => string + "\n" + category);

        return message.channel.send(embed.setDescription(info));
    }
}