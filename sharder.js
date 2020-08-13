const { ShardingManager } = require("kurasuta")
const config = require('./src/config')

const sharder = new ShardingManager(__dirname + "/src/index.js", {
    token: config.token,
    respawn: true, 
    retry: true,
    clientOptions: {
        disableEveryone: true,
        autoReconnect: true
    },
    shardCount: 1,
    guildsPerShard: 100,
    ipcSocket: 9999
})

sharder.spawn()

sharder.on("message", message => {
    if (message.type === "shutdown") {
        if (message.shard === "all") return sharder.clusters.forEach(shard => {
            console.warn("[Kurasuta] [Shutdown] Destroying shard " + shard.id)
            shard.kill()

            process.exit()
        })

        console.warn("[Kurasuta] [Shutdown] Destroying shard " + message.shard)
        return sharder.clusters.get(message.shard).kill()
    }

    if (message.type === "reboot") {
        if (message.shard === "all") {
            console.warn("[Kurasuta] [Shutdown] Rebooting all shards.")

            sharder.clusters.forEach(s => s.kill())
            return sharder.spawn()
        }

        console.warn("[Kurasuta] [Shutdown] Rebooting shard " + message.shard)
        try {
            sharder.clusters.get(message.shard).respawn()
        }catch{ sharder.restartAll() }
    }
})
sharder.on("debug", message => console.log("[Kurasuta] [Debug] " + message))
sharder.on("ready", () => console.info("[Kurasuta] [Cluster] Kurasuta Cluster ready!"))
sharder.on("shardReady", shard => console.info(`[Kurasuta] [Shard] Shard ${shard} ready!`))
sharder.on("shardReconnect", shard => console.warn(`[Kurasuta] [Shard] Reconnecting shard ${shard}...`))
sharder.on("shardResume", (replayed, shard) => console.info(`[Kurasuta] [Shard] Shard ${shard} resumed your session. Replayed ${replayed} events.`))
sharder.on("shardDisconnect", shard => console.warn(`[Kurasuta] [Shard] Shard ${shard} disconnected.`))
sharder.on("error", error => console.error(error))

process.on("SIGINT", signal => {
    sharder.clusters.forEach(shard => {
        console.warn("[Kurasuta] [Shutdown] Destroying shard " + shard.id)
        shard.kill()
    })
    process.exit()
})

module.exports = sharder