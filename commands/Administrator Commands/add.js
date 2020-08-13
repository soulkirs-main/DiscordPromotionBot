const { dbTable, prefix } = require("../../src/config")

String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

function checkServeradded(client, id, data2){
    let admin
    data2["categorylist"].map(m => {
        data2[m].map(as => {
            if(as.id == id) {
                admin = true
            } else {
                admin = false
            }
        })
    })
    return admin
}

module.exports = {
    name: "추가",
    aliases: ["add", "추가"],
    category: "Administrator Commands",
    description: "서버를추가합니다.",
    run: async (client, message, con) => {
        if(!message.member.hasPermission('ADMINISTRATOR', { checkAdmin: false, checkOwner: false })){
            return message.reply("해당 커맨드는 서버의 관리자만 이용할 수 있습니다.")
        }
        
        con.query(`select * from ${dbTable}`, (err, rows) => {
            if(err) throw err
            console.log(rows[0].data)
            const data = rows[0].data
            const data2 = JSON.parse(data)
            console.log(data2)
            if(!message.data.args){
                return message.channel.send(`사용법: ${prefix}추가 [카테고리] [서버 설명]\n\n카테고리 목록: \`${data2["categorylist"].join(", ")}\``)
            }
            if(!data2["categorylist"].includes(message.data.arg[0])){
                return message.channel.send(`\`${data2["categorylist"].join(", ")}\`의 카테고리를 추가 하실 수 있습니다.`)
            }
            if(message.data.args.replaceAll("'", "").replaceAll(message.data.arg[0], "").replaceAll(`"`, "").length < 10){
                return message.reply(`서버 설명은 10자 이상이어야 합니다.\n사용법: \`${prefix}추가 [카테고리] [설명]\``)
            }
            if(message.data.args.replaceAll("'", "").replaceAll('"', "").length > 150 + message.data.arg[0].length){
                return message.reply("서버 설명은 띄어쓰기 포함 150자를 넘지 않아야 합니다.")
            }
            if(checkServeradded(client, message.guild.id, data2) == true) {
                return message.reply("해당 서버는 이미 등록되어 있습니다.")
            }
            
            message.channel.createInvite(
                {
                  maxAge: 0,
                  maxUses: 0
                },
                `Requested with command by ${message.author.tag}`
            ).then(m => {
                data2[message.data.arg[0]].push({"id": message.guild.id, "invite": m.code, "desc": message.data.args.replaceAll("'", "").replaceAll('"', "").replace(message.data.arg[0], "").replaceAll("\n", "줄바꿈"), "name": message.guild.name.replaceAll("'", "")})
                message.channel.send(`\`${message.data.arg[0]}\`카테고리에 해당 서버가 등록되었습니다. 봇이 만든 초대링크(\`${m.code}\`)를 지우시면 다른 유저들이 해당 서버에 참가할 수 없습니다.`)
                const data3 = JSON.stringify(data2).replaceAll("'", `"`).replaceAll("\\", "")
                con.query(`truncate ${dbTable}`)
                con.query(`insert into ${dbTable} values('${data3}')`)
            })
        })
    }
}