const path = require("path");

const fs = require('fs')
const {EmbedBuilder, Collection} = require('discord.js')

class ButtonsHandler {
    private buttons: typeof Collection;
    private discord: any;

    constructor(discord) {
        this.discord = discord
        this.buttons = new Collection()
        let buttonFiles = fs.readdirSync(path.resolve(__dirname, '../buttons'))
        for (const file of buttonFiles) {
            const button = new (require(path.resolve(__dirname, '../buttons', file)))(discord)
            this.buttons.set(button.name, button)
        }
    }

    async handle(interaction) {
        switch (interaction.customId) {
            case 'creepButton':

                let creepButtonPressed = this.buttons.get(interaction.customId)

                if (!creepButtonPressed) return false

                this.discord.app.log.discord(`[${creepButtonPressed.name}] pressed`)

                creepButtonPressed.onPressed(interaction)
                return true
            case 'bossButton':
                let bossButtonPressed = this.buttons.get(interaction.customId)

                if (!bossButtonPressed) return false

                this.discord.app.log.discord(`[${bossButtonPressed.name}] pressed`)

                bossButtonPressed.onPressed(interaction)
                return true

            default:
                return false
        }
    }
}

module.exports = ButtonsHandler
