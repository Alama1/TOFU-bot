const fetch = require('node-fetch')
const { EmbedBuilder } = require('discord.js')
const minecraftManager = require('../../minecraft/minecraftManager')
const fs = require('fs');
export {}

class RoleRequestButton {
    private name: string;
    private discord: any;
    constructor(discord) {
        this.name = 'bossButton'
        this.discord = discord
    }

    async onPressed(interaction) {
        const userID = interaction.user.id
        fs.readFile('./bossReminder.json', 'utf-8', async (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const bossWaitersData = await JSON.parse(data)
            bossWaitersData[userID] = Date.now()

            fs.writeFileSync('./bossReminder.json', JSON.stringify(bossWaitersData))

            let doneEmbed = new EmbedBuilder()
            doneEmbed.setTitle('Гатова')
            doneEmbed.setDescription(`Я тя записал, напомню через неделю нах :3`)
            doneEmbed.setColor('#00ffa5')

            interaction.reply({
                embeds: [doneEmbed],
                ephemeral: true
            })
        })
    }
}

module.exports = RoleRequestButton
