const { prefix } = require("../src/config")

module.exports = async (client, message, con) => {
    if (message.author.bot) return

    if (!message.content.startsWith(prefix)) return
    if (!message.member) message.member = await message.guild.fetchMember(message)

    message.data = {
        raw: message.content,
        arg: message.content.split(' ').slice(1),
        args: message.content.slice(message.content.split(' ')[0].length + 1),
        prefix: message.content.substr(0, 1),
        cmd: message.content.split(' ')[0].toLowerCase().replace(prefix, '')
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()

    if (cmd.length === 0) return

    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd))

    if (command) {
        command.run(client, message, con)
    }
}