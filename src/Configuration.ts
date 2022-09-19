const fs = require('fs')

class Configuration {
    properties = {
        discord: {
            token: null,
            channel: null,
            commandRole: '',
            ownerId: '',
            prefix: '!',
            messageMode: 'bot'
        },
        express: {
            enabled: false,
            port: process.env.PORT,
            authorization: "authorizationHeaderString"
        }
    }

    environmentOverrides = {
        DISCORD_TOKEN: val => (this.properties.discord.token = val),
        DISCORD_CHANNEL: val => (this.properties.discord.channel = val),
        DISCORD_COMMAND_ROLE: val => (this.properties.discord.commandRole = val),
        DISCORD_OWNER_ID: val => (this.properties.discord.ownerId = val),
        DISCORD_PREFIX: val => (this.properties.discord.prefix = val),
        MESSAGE_MODE: val => (this.properties.discord.messageMode = val),
        EXPRESS_ENABLED: val => (this.properties.express.enabled = val),
        EXPRESS_PORT: val => (this.properties.express.enabled = val),
        EXPRESS_AUTHORIZATION: val => (this.properties.express.authorization = val)
    }

    constructor() {
        if (fs.existsSync('configProd.json')) {
            if (process.env.NODE_ENV === 'production') {
                this.properties = require('../configProd.json')
                this.properties.discord.token = process.env.TOKEN
                this.properties.express.port = process.env.PORT
            } else {
                require('dotenv').config();
                this.properties = require('../configDev.json')
                this.properties.discord.token = process.env.TOKEN
            }
        }

        for (let environment of Object.keys(process.env)) {
            if (this.environmentOverrides.hasOwnProperty(environment)) {
                this.environmentOverrides[environment](process.env[environment])
            }
        }
    }

    get discord() {
        return this.properties.discord
    }

    get express() {
        return this.properties.express
    }
}
export {}

module.exports = Configuration
