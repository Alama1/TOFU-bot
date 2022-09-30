const StateHandler = require('./handlers/StateHandler')
const InteractionHandler = require('./handlers/InteractionHandler')
const ButtonHandler = require('./handlers/ButtonHandler')
const { Client, IntentsBitField } = require('discord.js')
class DiscordManager  {
    private app: any;
    private stateHandler: typeof StateHandler;
    private client: typeof Client;
    private interactionHandler: typeof InteractionHandler;
    private buttonHandler: typeof ButtonHandler;
    constructor(app) {

        this.app = app
        this.stateHandler = new StateHandler(this)
    }

    connect() {
        const allIntends = new IntentsBitField(9763)
        this.client = new Client({
            cacheGuilds: true,
            cacheChannels: true,
            cacheOverwrites: false,
            cacheRoles: true,
            cacheEmojis: false,
            cachePresences: false,
            intents: allIntends
        })


        this.client.on('ready', async () => {
            this.stateHandler.onReady()
            this.interactionHandler = new InteractionHandler(this)
            this.buttonHandler = new ButtonHandler(this)
            this.stateHandler.checkingWaitLists()

            setInterval(() => {
                this.stateHandler.checkingWaitLists()
                console.log('Checking for waiters...')
            }, 60000)
        })

        this.client.on('interactionCreate', interaction => {
            this.interactionHandler.onInteraction(interaction)
        })

        this.client.login(this.app.config.discord.token).catch(error => {
            this.app.log.error(error)

            process.exit(1)
        })
    }
}
export {}

module.exports = DiscordManager
