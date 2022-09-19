const { SlashCommandBuilder } = require('@discordjs/builders');
const InteractionHandler = require('../handlers/InteractionHandler')
export{ InteractionHandler }

class createButton {
    private interactionHandler: typeof InteractionHandler;
    constructor(interactionHandler) {
        this.interactionHandler = interactionHandler
    }

    data = new SlashCommandBuilder()
        .setName('createbutton')
        .setDescription('Create a button for some interaction')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('What type of button do you need?')
                .setRequired(true)
                .addChoices(
                    { name: 'Reminder buttons', value: 'reminderbutton' }
                ))
        .addStringOption(option =>
            option.setName('bossbutton')
                .setDescription('Boss button text')
                .setRequired(true)
                .setMaxLength(20)
        )
        .addStringOption(option =>
            option.setName('creepbutton')
                .setDescription('Creep button text')
                .setRequired(true)
                .setMaxLength(20)
        )
        .addStringOption(option =>
            option.setName('textontop')
                .setDescription('Text over the button')
                .setRequired(true)
        )
}

module.exports = createButton
