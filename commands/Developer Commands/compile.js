const Discord = require('discord.js')
const Input = 'const Discord = require(\'discord.js\')\n'

module.exports = {
  name: 'compile',
  aliases: ['cmd', 'eval'],
  category: '',
  description: '',
  usage: '',
  run: async (client, message, arg) => {
    const msg = message
    const cmd = Input + message.data.arg.join(' ')

    let type
    new Promise(resolve => resolve(eval(cmd))).then(async res => {
      let code = type = res
      if (typeof code !== 'string') code = require('util').inspect(code, { depth: 0 })
      if (typeof type === 'function') code = type.toString()

      const successEmbed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Code Exec')
        .addField('📥 Input', `\`\`\`js\n${String(cmd).length > 983 ? clean(String(cmd).substring(0, 983) + '\n//And much more...') : clean(cmd)}\n\`\`\``)
        .addField('📤 Output', `\`\`\`js\n${String(code).length > 983 ? clean(String(code).substring(0, 983) + '\n//And much more...') : clean(code)}\n\`\`\``)
      message.channel.send(successEmbed)
    }).catch(Ecmd => {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Error!')
        .addField('📥 Input', `\`\`\`js\n${String(cmd).length > 983 ? clean(String(cmd).substring(0, 983) + '\n//And much more...') : clean(cmd)}\n\`\`\``)
        .addField('📤 Output', `\`\`\`js\n${String(Ecmd).length > 983 ? clean(String(Ecmd).substring(0, 983) + '\n//And much more...') : clean(Ecmd)}\n\`\`\``)
      message.channel.send(errorEmbed)
    })

    function clean (text) {
      return typeof text === 'string' ? text.replace(/`/gi, '`' + String.fromCharCode(8203)).replace(/@/gi, '@' + String.fromCharCode(8203)) : text
    }

    function isJSON (code) {
      try {
        JSON.parse(code)
        return true
      } catch (e) {
        return false
      }
    }
  }
}