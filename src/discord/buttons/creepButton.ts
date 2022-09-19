import fs from "fs";

const fetch = require('node-fetch')
const { EmbedBuilder } = require('discord.js')
export {}

class RoleRequestButton {
    private name: string;
    private discord: any;
    constructor(discord) {
        this.name = 'creepButton'
        this.discord = discord
    }

    async onPressed(interaction) {
        const userID = interaction.user.id
        fs.readFile('./creepsReminder.json', 'utf-8', async (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const creepWaitersData = await JSON.parse(data)

            creepWaitersData[userID] = Date.now()

            fs.writeFileSync('./creepsReminder.json', JSON.stringify(creepWaitersData))

            let doneEmbed = new EmbedBuilder()
            doneEmbed.setTitle('Гатова')
            doneEmbed.setDescription(`Я тя записал, напомню через 3 дня нах :3`)
            doneEmbed.setColor('#00ffa5')

            interaction.reply({
                embeds: [doneEmbed],
                ephemeral: true
            })
        })
    }
}

module.exports = RoleRequestButton
