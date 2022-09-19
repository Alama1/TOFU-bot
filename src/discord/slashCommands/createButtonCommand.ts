const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const interactionHandler = require('../handlers/InteractionHandler')
export {}

class createButtonCommand {
    private discord: typeof interactionHandler;
    private name: string;
    constructor(discord) {
        this.discord = discord
        this.name = 'createbutton'
    }

    onCommand(interaction) {
        let textOnTop
        let creepButtonText
        let bossButtonText
        let type
        interaction.options._hoistedOptions.forEach(option => {
            switch (option.name) {
                case 'textontop':
                    textOnTop = option.value
                    break
                case 'creepbutton':
                    creepButtonText = option.value
                    break
                case 'bossbutton':
                    bossButtonText = option.value
                    break
                case 'type':
                    type = option.value
                    break
            }
        })

        if (type === 'reminderbutton') {
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('creepButton')
                        .setLabel(creepButtonText)
                        .setStyle(ButtonStyle.Primary),
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('bossButton')
                        .setLabel(bossButtonText)
                        .setStyle(ButtonStyle.Primary),
                );
            interaction.channel.send({ content: textOnTop, components: [row] })
            interaction.reply({ content: `Done!`, ephemeral: true })
        }
    }
}


module.exports = createButtonCommand
