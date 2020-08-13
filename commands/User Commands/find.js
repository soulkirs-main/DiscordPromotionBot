const Discord = require("discord.js")
const { dbTable, prefix } = require("../../src/config")

String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

Array.prototype.shuffle = function () {
    var length = this.length
    
    while (length) {
        var index = Math.floor((length--) * Math.random())
        var temp = this[length]
        this[length] = this[index]
        this[index] = temp
    }
    return this
}

const generateEmbed = (start, serverlist) => {
    const current = serverlist.slice(start, start + 5)

    const embed = new Discord.MessageEmbed()
      .setTitle(`${start + 1}-${start + current.length} out of ${serverlist.length}`)
    let data123
    current.forEach(g => data123 += `**[${g.name}](https://discord.gg/${g.invite})**\n${g.desc.replaceAll('줄바꿈', '\n')}\n`)
    embed.setDescription(data123.replaceAll("undefined", ""))
    return embed
}

module.exports = {
    name: "서버찾기",
    aliases: ["서버찾기", "find"],
    category: "User Commands",
    description: "원하는 카테고리의 서버를 찾습니다.",
    run: async (client, message, con) => {
        con.query(`select * from ${dbTable}`, (err, rows) => {
            if(err) throw err
            
            console.log(rows[0].data)
            const data = rows[0].data
            const data2 = JSON.parse(data)
            if(!data2["categorylist"].includes(message.data.args)){
                return message.channel.send(`\`${data2["categorylist"].join(", ")}\`의 카테고리를 검색하실 수 있습니다.\n\n\`${prefix}서버찾기 [카테고리명]\``)
            }
            console.log(data2)
            
            const data3 = JSON.stringify(data2).replaceAll("'", `"`).replaceAll("\\", "")
            console.log(data3)

            const author = message.author

            const dataguild = data2[message.data.args].shuffle()
            message.channel.send(generateEmbed(0, dataguild)).then(message => {
                // if (data2[message.data.args].shuffle().length <= 10) return
                message.react('⬅️')
                message.react('➡️')
                const collector = message.createReactionCollector(
                    (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
                    {time: 60000}
                )
              
                let currentIndex = 0
                collector.on('collect', reaction => {
                    reaction.emoji.name === '⬅️' ? currentIndex -= 5 : currentIndex += 5
                    if(currentIndex<0) return
                    if (currentIndex > dataguild.length) return
                    message.edit(generateEmbed(currentIndex, dataguild))
                    console.log(currentIndex)
                    
                    if (currentIndex !== 0) message.react('⬅️')
                    if (currentIndex + 5 < dataguild.length) message.react('➡️')
                })
            })
        })
    }
}