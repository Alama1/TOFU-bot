const fetch = require('node-fetch')
const { EmbedBuilder } = require('discord.js')
const minecraftManager = require('../../minecraft/minecraftManager')
export {}

class RoleRequestButton {
    private name: string;
    private discord: any;
    constructor(discord) {
        this.name = 'roleRequestButton'
        this.discord = discord
    }

    async onPressed(interaction) {

    }
}

module.exports = RoleRequestButton
