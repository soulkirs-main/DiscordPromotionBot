const config = require("../../src/config.js")


module.exports = {
    name: "핑",
    aliases: ["ping"],
    category: "User Commands",
    description: "핑",
    usage: "ping",
    run: async (client, message) => {
        const { MessageEmbed } = require('discord.js')
  
              var embed = new MessageEmbed()
              .setAuthor(`레이턴시는 ${client.ws.ping} ms 입니다.`)
              .setColor("RANDOM")
              

              message.channel.send(embed)

        }
    }

