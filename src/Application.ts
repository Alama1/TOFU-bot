const Configuration = require('./Configuration')
const DiscordManager = require('./discord/DiscordManager')
const Logger = require('./Logger')
const ExpressManager = require('./express/ExpressManager')

class Application {
    private log: typeof Logger;
    private config: typeof Configuration;
    private express: typeof ExpressManager;
    private discord: typeof DiscordManager;

    async register() {

        this.config = new Configuration()
        this.log = new Logger()
        this.discord = new DiscordManager(this)
        this.express = new ExpressManager(this)
    }

    async connect() {
        this.discord.connect()
        this.express.initialize()
    }
}

module.exports = new Application()
