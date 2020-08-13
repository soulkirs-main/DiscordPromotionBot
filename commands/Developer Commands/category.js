const { dbTable, owner } = require("../../src/config")

String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

module.exports = {
    name: "카테고리",
    aliases: ["category", "카테고리"],
    category: "Developer Commands",
    description: "카테고리를 추가/초기화합니다.",
    run: async (client, message, con) => {
        if(!owner.includes(message.author.id)) return message.reply("권한없음")
        if(!message.data.args) return message.reply("카테고리를 적어주세요.")
        if(message.data.arg[0] == "추가"){
            con.query(`select * from ${dbTable}`, (err, rows) => {
                if(err) throw err
                console.log(rows[0].data)
                const data = rows[0].data
                const data2 = JSON.parse(data)
                console.log(data2)

                data2[message.data.args.replaceAll(message.data.arg[0], "")] = []
                data2["categorylist"].push(message.data.args.replaceAll(message.data.arg[0], ""))
                const data3 = JSON.stringify(data2).replaceAll("'", `"`).replaceAll("\\", "").replaceAll(" ", "")

                con.query(`truncate ${dbTable}`)
                con.query(`insert into ${dbTable} values('${data3}')`)
                message.reply("추가가 완료되었습니다.")
            })
            if(message.data.arg[0] == "초기화"){
                con.query('select * from test', (err, rows) => {
                    if(err) throw err
                    console.log(rows[0].data)
                    const data = rows[0].data
                    const data2 = JSON.parse(data)
                    console.log(data2)
    
                    data2[message.data.args.replaceAll(message.data.arg[0], "")] = []
                    const data3 = JSON.stringify(data2).replaceAll("'", `"`).replaceAll("\\", "").replaceAll(" ", "")
    
                    con.query(`truncate ${dbTable}`)
                    con.query(`insert into ${dbTable} values('${data3}')`)
                    message.reply("초기화가 완료되었습니다.")
                })
            }
        }
    }
}