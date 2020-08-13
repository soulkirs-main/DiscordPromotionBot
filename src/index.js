const { Client, Collection } = require("discord.js");
const { BaseCluster, isMaster } = require("kurasuta")
const fs = require("fs");
const config = require('./config')
const messageHandler = require("../handlers/message")
const mysql = require("mysql")


module.exports = class extends BaseCluster {
    launch() {
        const client = this.client

        client.commands = new Collection()
        client.aliases = new Collection()
        client.categories = fs.readdirSync("./commands/")

        require(`../handlers/command`)(client);

        var con = mysql.createConnection({
            host: config.dbHost,
            user: config.dbUser,
            password: config.dbPWD,
            database: config.dbDb
        })
        
        con.connect(err => {
            if(err) throw err
            console.log('connected to DB!')
        })

        client.on("debug", info => {
            if(info.includes("ws")) console.log(info)
        })

        client.on('ready', () => {
            console.log(client.user.tag)
            client.user.setActivity(config.activity)
        })

        client.on("message", async message => {
            messageHandler(client, message, con)
        });

        process.on("unhandledRejection", (reason, listener) => {
            try{ listener }catch(err) { throw err }
        })
        process.on("uncaughtException", error => { throw error })

        client.login(config.token)
    }
}