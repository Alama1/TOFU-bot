const Configuration = require('./Configuration')
const DiscordManager = require('./discord/DiscordManager')
const Logger = require('./Logger')

class Application {
    private log: typeof Logger;
    private config: typeof Configuration;
    private discord: typeof DiscordManager;
    async register() {
        this.config = new Configuration()
        this.log = new Logger()
        this.discord = new DiscordManager(this)
    }

    async connect() {
        this.discord.connect()
    }
}

module.exports = new Application()
