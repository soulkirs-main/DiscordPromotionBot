module.exports = {
    name: "봇정보",
    aliases: ["botinfo"],
    category: "User Commands",
    description: "heasy봇에대한 짧은 설명",
    usage: "봇정보",
    run: async (client, message) => {
        const { MessageEmbed } = require('discord.js')
        const infoEmbed = new MessageEmbed()
            .setTitle("**Heasy봇**")
            .setThumbnail("https://cdn.discordapp.com/avatars/638683182316650506/d3b27a775724b1cd9a695f6a048bcad4.png?size=128")
            .setDescription("설명:Heasy봇")
            .addField("\n초대", "[InviteBot](https://discord.com/api/oauth2/authorize?client_id=638683182316650506&permissions=8&scope=bot)", true)
            .addField("\n접두사", "/", true)
            .addField("\n오픈소스","[Github](https://github.com/soulkirs-main/DiscordPromotionBot)" ,true)
    message.channel.send(infoEmbed)

    }
}
